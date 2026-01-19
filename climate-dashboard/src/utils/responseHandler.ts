import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const sendSuccess = <T>(
  data: T,
  message?: string,
  pagination?: ApiResponse<T>["pagination"]
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json({
    success: true,
    data,
    message,
    ...(pagination && { pagination }),
  });
};

export const sendValidationError = (message: string): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 400 }
  );
};

export const sendNotFoundError = (message: string = "Resource not found"): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 404 }
  );
};

export const sendError = (message: string, status: number = 500): NextResponse<ApiResponse> => {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
};
