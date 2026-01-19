import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendNotFoundError, sendError } from "@/utils/responseHandler";
import { mockWeatherStations } from "@/data/mockData";
import { WeatherStation } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const station = mockWeatherStations.find((s) => s.id === params.id);
    
    if (!station) {
      return sendNotFoundError("Weather station not found");
    }

    return sendSuccess(station, "Weather station retrieved successfully");
  } catch (error) {
    return sendError("Failed to retrieve weather station");
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const stationIndex = mockWeatherStations.findIndex((s) => s.id === params.id);
    
    if (stationIndex === -1) {
      return sendNotFoundError("Weather station not found");
    }

    const { name, location, latitude, longitude, status } = body;
    const existingStation = mockWeatherStations[stationIndex];

    if (latitude !== undefined && (typeof latitude !== "number" || latitude < -90 || latitude > 90)) {
      return sendValidationError("Invalid latitude value");
    }

    if (longitude !== undefined && (typeof longitude !== "number" || longitude < -180 || longitude > 180)) {
      return sendValidationError("Invalid longitude value");
    }

    if (status) {
      const validStatuses = ["active", "inactive", "maintenance"];
      if (!validStatuses.includes(status)) {
        return sendValidationError(`Status must be one of: ${validStatuses.join(", ")}`);
      }
    }

    const updatedStation: WeatherStation = {
      ...existingStation,
      name: name || existingStation.name,
      location: location || existingStation.location,
      latitude: latitude !== undefined ? latitude : existingStation.latitude,
      longitude: longitude !== undefined ? longitude : existingStation.longitude,
      status: status || existingStation.status,
    };

    mockWeatherStations[stationIndex] = updatedStation;

    return sendSuccess(updatedStation, "Weather station updated successfully");
  } catch (error) {
    return sendValidationError("Invalid request body");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stationIndex = mockWeatherStations.findIndex((s) => s.id === params.id);
    
    if (stationIndex === -1) {
      return sendNotFoundError("Weather station not found");
    }

    const deletedStation = mockWeatherStations[stationIndex];
    mockWeatherStations.splice(stationIndex, 1);

    return sendSuccess(deletedStation, "Weather station deleted successfully");
  } catch (error) {
    return sendError("Failed to delete weather station");
  }
}
