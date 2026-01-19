import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendNotFoundError } from "@/utils/responseHandler";
import { mockSensorAlerts, mockWeatherStations } from "@/data/mockData";
import { SensorAlert, PaginationParams, FilterParams } from "@/types";
import { alertCreateSchema } from "@/lib/schemas/alertSchema";
import { handleZodError } from "@/lib/zodError";

function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  return { page, limit };
}

function parseFilterParams(searchParams: URLSearchParams): FilterParams {
  return {
    stationId: searchParams.get("stationId") || undefined,
    status: searchParams.get("status") || undefined,
    type: searchParams.get("type") || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
  };
}

function filterAlerts(alerts: SensorAlert[], filters: FilterParams): SensorAlert[] {
  return alerts.filter((alert) => {
    if (filters.stationId && alert.stationId !== filters.stationId) return false;
    if (filters.status && alert.status !== filters.status) return false;
    if (filters.type && alert.type !== filters.type) return false;
    
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      if (alert.createdAt < startDate) return false;
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (alert.createdAt > endDate) return false;
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

    let filteredAlerts = filterAlerts(mockSensorAlerts, filters);

    filteredAlerts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const { data, total, totalPages } = paginateResults(
      filteredAlerts,
      pagination.page!,
      pagination.limit!
    );

    return sendSuccess(
      data,
      "Sensor alerts retrieved successfully",
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

    const { stationId, type, threshold, currentValue } =
      alertCreateSchema.parse(body);

    const stationExists = mockWeatherStations.some(station => station.id === stationId);
    if (!stationExists) {
      return sendNotFoundError("Weather station not found");
    }

    const newAlert: SensorAlert = {
      id: `alert-${Date.now()}`,
      stationId,
      type,
      threshold,
      currentValue,
      status: "active",
      createdAt: new Date(),
    };

    mockSensorAlerts.push(newAlert);

    return sendSuccess(newAlert, "Sensor alert created successfully");
  } catch (error) {
    return handleZodError(error);
  }
}
