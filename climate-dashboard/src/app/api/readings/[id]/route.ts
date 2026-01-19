import { NextRequest } from "next/server";
import { sendSuccess, sendNotFoundError, sendError } from "@/utils/responseHandler";
import { mockSensorReadings } from "@/data/mockData";
import { SensorReading } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reading = mockSensorReadings.find((r) => r.id === params.id);
    
    if (!reading) {
      return sendNotFoundError("Sensor reading not found");
    }

    return sendSuccess(reading, "Sensor reading retrieved successfully");
  } catch (error) {
    return sendError("Failed to retrieve sensor reading");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const readingIndex = mockSensorReadings.findIndex((r) => r.id === params.id);
    
    if (readingIndex === -1) {
      return sendNotFoundError("Sensor reading not found");
    }

    const deletedReading = mockSensorReadings[readingIndex];
    mockSensorReadings.splice(readingIndex, 1);

    return sendSuccess(deletedReading, "Sensor reading deleted successfully");
  } catch (error) {
    return sendError("Failed to delete sensor reading");
  }
}
