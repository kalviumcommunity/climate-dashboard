import { NextRequest } from "next/server";
import { sendSuccess } from "@/utils/responseHandler";
import { mockUsers } from "@/data/mockData";
import { User, PaginationParams, FilterParams } from "@/types";
import { userCreateSchema } from "@/lib/schemas/userSchema";
import { handleError, ValidationError, DatabaseError } from "@/lib/errorHandler";

/* ---------- helpers ---------- */

function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  return { page, limit };
}

function parseFilterParams(searchParams: URLSearchParams): FilterParams {
  return {
    status: searchParams.get("role") || undefined,
  };
}

function filterUsers(users: User[], filters: FilterParams): User[] {
  return users.filter((user) => {
    if (filters.status && user.role !== filters.status) return false;
    return true;
  });
}

function paginateResults<T>(
  items: T[],
  page: number,
  limit: number
): {
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

/* ---------- GET /api/users ---------- */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagination = parsePaginationParams(searchParams);
    const filters = parseFilterParams(searchParams);

    const filteredUsers = filterUsers(mockUsers, filters);

    const { data, total, totalPages } = paginateResults(
      filteredUsers,
      pagination.page,
      pagination.limit
    );

    return sendSuccess(
      data,
      "Users retrieved successfully",
      {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      }
    );
  } catch (error) {
    const { searchParams } = new URL(request.url);
    return handleError(error, {
      method: "GET",
      url: "/api/users",
      searchParams: Object.fromEntries(searchParams)
    });
  }
}

/* ---------- POST /api/users ---------- */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, role } = userCreateSchema.parse(body);

    const existingUser = mockUsers.find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      throw new ValidationError("Username or email already exists", {
        method: "POST",
        url: "/api/users",
        body: { username, email }
      });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      role,
      createdAt: new Date(),
    };

    mockUsers.push(newUser);

    return sendSuccess(newUser, "User created successfully");
  } catch (error) {
    return handleError(error, {
      method: "POST",
      url: "/api/users"
    });
  }
}
