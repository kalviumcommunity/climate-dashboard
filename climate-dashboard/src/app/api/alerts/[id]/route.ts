import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/utils/responseHandler";
import { mockSensorAlerts } from "@/data/mockData";
import { SensorAlert } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const alert = mockSensorAlerts.find((a) => a.id === params.id);
    
    if (!alert) {
      return sendNotFoundError("Sensor alert not found");
    }

    return sendSuccess(alert, "Sensor alert retrieved successfully");
  } catch (error) {
    return sendError("Failed to retrieve sensor alert");
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const alertIndex = mockSensorAlerts.findIndex((a) => a.id === params.id);
    
    if (alertIndex === -1) {
      return sendNotFoundError("Sensor alert not found");
    }

    const { status } = body;
    const existingAlert = mockSensorAlerts[alertIndex];

    if (status) {
      const validStatuses = ["active", "resolved", "acknowledged"];
      if (!validStatuses.includes(status)) {
        return sendValidationError(`Status must be one of: ${validStatuses.join(", ")}`);
      }
    }

    const updatedAlert: SensorAlert = {
      ...existingAlert,
      status: status || existingAlert.status,
    };

    mockSensorAlerts[alertIndex] = updatedAlert;

    return sendSuccess(updatedAlert, "Sensor alert updated successfully");
  } catch (error) {
    return sendValidationError("Invalid request body");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const alertIndex = mockSensorAlerts.findIndex((a) => a.id === params.id);
    
    if (alertIndex === -1) {
      return sendNotFoundError("Sensor alert not found");
    }

    const deletedAlert = mockSensorAlerts[alertIndex];
    mockSensorAlerts.splice(alertIndex, 1);

    return sendSuccess(deletedAlert, "Sensor alert deleted successfully");
  } catch (error) {
    return sendError("Failed to delete sensor alert");
  }
}
