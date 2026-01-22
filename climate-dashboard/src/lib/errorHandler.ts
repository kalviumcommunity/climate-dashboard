import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "./logger";

export type ErrorContext = {
  method?: string;
  url?: string;
  userId?: string;
  requestId?: string;
  [key: string]: any;
};

export type ErrorType = 
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND_ERROR"
  | "DATABASE_ERROR"
  | "EXTERNAL_API_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: ErrorType;
  public readonly isOperational: boolean;
  public readonly context?: ErrorContext;

  constructor(
    message: string,
    statusCode: number = 500,
    type: ErrorType = "INTERNAL_SERVER_ERROR",
    isOperational: boolean = true,
    context?: ErrorContext
  ) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = isOperational;
    this.context = context;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 400, "VALIDATION_ERROR", true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed", context?: ErrorContext) {
    super(message, 401, "AUTHENTICATION_ERROR", true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Access denied", context?: ErrorContext) {
    super(message, 403, "AUTHORIZATION_ERROR", true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", context?: ErrorContext) {
    super(message, 404, "NOT_FOUND_ERROR", true, context);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed", context?: ErrorContext) {
    super(message, 500, "DATABASE_ERROR", true, context);
  }
}

export class ExternalApiError extends AppError {
  constructor(message: string = "External service unavailable", context?: ErrorContext) {
    super(message, 502, "EXTERNAL_API_ERROR", true, context);
  }
}

function getErrorType(error: any): ErrorType {
  if (error instanceof AppError) return error.type;
  if (error instanceof ZodError) return "VALIDATION_ERROR";
  if (error.name === "PrismaClientKnownRequestError") return "DATABASE_ERROR";
  if (error.name === "PrismaClientUnknownRequestError") return "DATABASE_ERROR";
  if (error.code === "ETIMEDOUT") return "TIMEOUT_ERROR";
  if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") return "NETWORK_ERROR";
  
  return "INTERNAL_SERVER_ERROR";
}

function getStatusCode(error: any): number {
  if (error instanceof AppError) return error.statusCode;
  if (error instanceof ZodError) return 400;
  if (error.name === "PrismaClientKnownRequestError") return 400;
  if (error.code === "ETIMEDOUT") return 408;
  if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") return 503;
  
  return 500;
}

function sanitizeError(error: any, isProd: boolean) {
  if (error instanceof ZodError) {
    return {
      message: "Validation failed",
      errors: error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
        code: e.code
      }))
    };
  }

  if (error instanceof AppError) {
    return {
      message: error.message,
      type: error.type,
      ...(isProd ? {} : { context: error.context })
    };
  }

  return {
    message: isProd ? "Something went wrong. Please try again later." : error.message || "Unknown error",
    ...(isProd ? {} : { 
      stack: error.stack,
      name: error.name,
      code: error.code 
    })
  };
}

export function handleError(error: any, context: ErrorContext = {}) {
  const isProd = process.env.NODE_ENV === "production";
  const errorType = getErrorType(error);
  const statusCode = getStatusCode(error);
  
  const sanitizedError = sanitizeError(error, isProd);
  
  const errorResponse = {
    success: false,
    ...sanitizedError,
    timestamp: new Date().toISOString(),
    requestId: context.requestId
  };

  const logContext = {
    ...context,
    errorType,
    statusCode,
    originalError: {
      name: error.name,
      message: error.message,
      ...(isProd ? {} : { 
        stack: error.stack,
        code: error.code 
      })
    }
  };

  logger.error(`Error in ${context.method || 'Unknown'} ${context.url || 'Unknown'}`, logContext);

  return NextResponse.json(errorResponse, { status: statusCode });
}

export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context: ErrorContext = {}
) {
  return (...args: T): Promise<R> => {
    return Promise.resolve(fn(...args)).catch((error) => {
      throw error;
    });
  };
}
