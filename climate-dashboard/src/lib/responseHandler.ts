import { NextResponse } from "next/server";

/**
 * Global API Response Handler for consistent response format across all endpoints
 * 
 * Response Structure:
 * {
 *   "success": boolean,
 *   "message": string,
 *   "data"?: any,
 *   "error"?: {
 *     "code": string,
 *     "details"?: any
 *   },
 *   "timestamp": string
 * }
 */

export const sendSuccess = (data: any, message = "Success", status = 200) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

export const sendError = (
  message = "Something went wrong", 
  code = "INTERNAL_ERROR", 
  status = 500, 
  details?: any
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: { code, details },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

export const sendValidationError = (message: string, details?: any) => {
  return sendError(message, "VALIDATION_ERROR", 400, details);
};

export const sendNotFoundError = (resource = "Resource", details?: any) => {
  return sendError(`${resource} not found`, "NOT_FOUND", 404, details);
};

export const sendUnauthorizedError = (message = "Unauthorized", details?: any) => {
  return sendError(message, "UNAUTHORIZED", 401, details);
};

export const sendForbiddenError = (message = "Forbidden", details?: any) => {
  return sendError(message, "FORBIDDEN", 403, details);
};

export const sendConflictError = (message = "Conflict", details?: any) => {
  return sendError(message, "CONFLICT", 409, details);
};
