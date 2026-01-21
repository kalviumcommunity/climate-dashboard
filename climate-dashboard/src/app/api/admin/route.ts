import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendError } from "@/utils/responseHandler";
import { mockUsers, mockWeatherStations, mockSensorReadings, mockSensorAlerts } from "@/data/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let data: any = {};

    switch (type) {
      case "users":
        data = {
          total: mockUsers.length,
          admins: mockUsers.filter(u => u.role === "admin").length,
          operators: mockUsers.filter(u => u.role === "operator").length,
          users: mockUsers.map(({ password, ...user }) => user),
        };
        break;
      
      case "stations":
        data = {
          total: mockWeatherStations.length,
          active: mockWeatherStations.filter(s => s.status === "active").length,
          inactive: mockWeatherStations.filter(s => s.status === "inactive").length,
          maintenance: mockWeatherStations.filter(s => s.status === "maintenance").length,
          stations: mockWeatherStations,
        };
        break;
      
      case "readings":
        data = {
          total: mockSensorReadings.length,
          latest: mockSensorReadings.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime()).slice(0, 10),
          readings: mockSensorReadings,
        };
        break;
      
      case "alerts":
        data = {
          total: mockSensorAlerts.length,
          active: mockSensorAlerts.filter(a => a.status === "active").length,
          resolved: mockSensorAlerts.filter(a => a.status === "resolved").length,
          acknowledged: mockSensorAlerts.filter(a => a.status === "acknowledged").length,
          alerts: mockSensorAlerts,
        };
        break;
      
      default:
        data = {
          overview: {
            users: mockUsers.length,
            stations: mockWeatherStations.length,
            readings: mockSensorReadings.length,
            alerts: mockSensorAlerts.length,
          },
          recentActivity: {
            latestReadings: mockSensorReadings.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime()).slice(0, 5),
            latestAlerts: mockSensorAlerts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5),
          },
        };
    }

    return sendSuccess(data, "Admin data retrieved successfully");
  } catch (error) {
    return sendError("Failed to retrieve admin data");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "clearAlerts":
        const clearedCount = mockSensorAlerts.length;
        mockSensorAlerts.length = 0;
        return sendSuccess({ clearedCount }, "All alerts cleared successfully");
      
      case "resetData":
        const resetStats = {
          users: mockUsers.length,
          stations: mockWeatherStations.length,
          readings: mockSensorReadings.length,
          alerts: mockSensorAlerts.length,
        };
        return sendSuccess(resetStats, "Data reset statistics retrieved");
      
      default:
        return sendValidationError("Invalid admin action");
    }
  } catch (error) {
    return sendValidationError("Invalid request body");
  }
}
