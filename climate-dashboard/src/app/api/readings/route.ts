import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendNotFoundError } from "@/utils/responseHandler";
import { mockSensorReadings, mockWeatherStations } from "@/data/mockData";
import { SensorReading, PaginationParams, FilterParams } from "@/types";
import { readingCreateSchema } from "@/lib/schemas/readingSchema";
import { handleZodError } from "@/lib/zodError";

function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  return { page, limit };
}

function parseFilterParams(searchParams: URLSearchParams): FilterParams {
  return {
    stationId: searchParams.get("stationId") || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
  };
}

function filterReadings(readings: SensorReading[], filters: FilterParams): SensorReading[] {
  return readings.filter((reading) => {
    if (filters.stationId && reading.stationId !== filters.stationId) return false;
    
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      if (reading.recordedAt < startDate) return false;
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (reading.recordedAt > endDate) return false;
    }
    
    return true;
  });
}

function paginateResults<T>(items: T[], page: number, limit: number): {
  data: T[];
  total: number;
  totalPages: number;
} {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const data = items.slice(startIndex, startIndex + limit);
  
  return { data, total, totalPages };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagination = parsePaginationParams(searchParams);
    const filters = parseFilterParams(searchParams);

    if (filters.stationId) {
      const stationExists = mockWeatherStations.some(station => station.id === filters.stationId);
      if (!stationExists) {
        return sendNotFoundError("Weather station not found");
      }
    }

    let filteredReadings = filterReadings(mockSensorReadings, filters);

    filteredReadings.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());

    const { data, total, totalPages } = paginateResults(
      filteredReadings,
      pagination.page!,
      pagination.limit!
    );

    return sendSuccess(
      data,
      "Sensor readings retrieved successfully",
      {
        page: pagination.page!,
        limit: pagination.limit!,
        total,
        totalPages,
      }
    );
  } catch (error) {
    return sendValidationError("Invalid request parameters");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { stationId, temperature, humidity, airQuality, rainfall } =
      readingCreateSchema.parse(body);

    const stationExists = mockWeatherStations.some(station => station.id === stationId);
    if (!stationExists) {
      return sendNotFoundError("Weather station not found");
    }

    const newReading: SensorReading = {
      id: `reading-${Date.now()}`,
      stationId,
      temperature,
      humidity,
      airQuality,
      rainfall,
      recordedAt: new Date(),
    };

    mockSensorReadings.push(newReading);

    return sendSuccess(newReading, "Sensor reading created successfully");
  } catch (error) {
    return handleZodError(error);
  }
}
