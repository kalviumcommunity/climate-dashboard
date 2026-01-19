import { NextRequest } from "next/server";
import { sendSuccess, sendValidationError, sendNotFoundError } from "@/utils/responseHandler";
import { mockWeatherStations } from "@/data/mockData";
import { WeatherStation, PaginationParams, FilterParams } from "@/types";
import { stationCreateSchema } from "@/lib/schemas/stationSchema";
import { handleZodError } from "@/lib/zodError";

function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  return { page, limit };
}

function parseFilterParams(searchParams: URLSearchParams): FilterParams {
  return {
    status: searchParams.get("status") || undefined,
    stationId: searchParams.get("stationId") || undefined,
  };
}

function filterStations(stations: WeatherStation[], filters: FilterParams): WeatherStation[] {
  return stations.filter((station) => {
    if (filters.status && station.status !== filters.status) return false;
    if (filters.stationId && station.id !== filters.stationId) return false;
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

    let filteredStations = filterStations(mockWeatherStations, filters);

    if (filters.stationId && filteredStations.length === 0) {
      return sendNotFoundError("Weather station not found");
    }

    const { data, total, totalPages } = paginateResults(
      filteredStations,
      pagination.page!,
      pagination.limit!
    );

    return sendSuccess(
      data,
      "Weather stations retrieved successfully",
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

    const { name, location, latitude, longitude, status } =
      stationCreateSchema.parse(body);

    const newStation: WeatherStation = {
      id: `station-${Date.now()}`,
      name,
      location,
      latitude,
      longitude,
      status: status || "active",
      createdAt: new Date(),
    };

    mockWeatherStations.push(newStation);

    return sendSuccess(newStation, "Weather station created successfully");
  } catch (error) {
    return handleZodError(error);
  }
}
