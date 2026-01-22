import { NextRequest } from "next/server";
import { sendSuccess } from "@/utils/responseHandler";
import { 
  handleError, 
  ValidationError, 
  AuthenticationError, 
  NotFoundError, 
  DatabaseError, 
  ExternalApiError 
} from "@/lib/errorHandler";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const errorType = searchParams.get("type") || "none";

    switch (errorType) {
      case "validation":
        throw new ValidationError("This is a validation error example", {
          method: "GET",
          url: "/api/test-errors",
          userId: "test-user-123"
        });

      case "auth":
        throw new AuthenticationError("Invalid credentials provided", {
          method: "GET",
          url: "/api/test-errors",
          userId: "test-user-123"
        });

      case "notfound":
        throw new NotFoundError("Resource not found", {
          method: "GET",
          url: "/api/test-errors",
          resourceId: "resource-456"
        });

      case "database":
        throw new DatabaseError("Database connection failed", {
          method: "GET",
          url: "/api/test-errors",
          query: "SELECT * FROM users"
        });

      case "external":
        throw new ExternalApiError("Weather API is down", {
          method: "GET",
          url: "/api/test-errors",
          externalService: "weather-api.com"
        });

      case "generic":
        throw new Error("This is a generic error example");

      case "timeout":
        const timeoutError = new Error("Request timeout") as any;
        timeoutError.code = "ETIMEDOUT";
        throw timeoutError;

      case "network":
        const networkError = new Error("Connection refused") as any;
        networkError.code = "ECONNREFUSED";
        throw networkError;

      default:
        return sendSuccess({
          message: "Error handling test endpoint",
          availableErrorTypes: [
            "validation",
            "auth", 
            "notfound",
            "database",
            "external",
            "generic",
            "timeout",
            "network"
          ],
          usage: "Add ?type=<error_type> to test different error scenarios",
          environment: process.env.NODE_ENV || "development"
        }, "Test endpoint loaded successfully");
    }

  } catch (error) {
    const { searchParams } = new URL(request.url);
    return handleError(error, {
      method: "GET",
      url: "/api/test-errors",
      searchParams: Object.fromEntries(searchParams),
      requestId: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.test) {
      throw new ValidationError("Missing 'test' field in request body", {
        method: "POST",
        url: "/api/test-errors",
        body
      });
    }

    if (body.test === "simulate-db-error") {
      throw new DatabaseError("Simulated database error", {
        method: "POST",
        url: "/api/test-errors",
        operation: "INSERT",
        table: "test_table"
      });
    }

    return sendSuccess({
      received: body,
      processed: true,
      timestamp: new Date().toISOString()
    }, "POST request processed successfully");

  } catch (error) {
    return handleError(error, {
      method: "POST",
      url: "/api/test-errors",
      requestId: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });
  }
}
