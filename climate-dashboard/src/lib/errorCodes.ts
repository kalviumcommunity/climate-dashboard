/**
 * Centralized error codes for consistent error handling across the API
 * These codes make it easier to trace issues from logs and monitoring tools
 */

export const ERROR_CODES = {
  // Validation Errors (400)
  VALIDATION_ERROR: "E001",
  MISSING_REQUIRED_FIELD: "E002",
  INVALID_INPUT_FORMAT: "E003",
  INVALID_STATUS: "E004",
  INVALID_PRIORITY: "E005",
  
  // Authentication/Authorization Errors (401, 403)
  UNAUTHORIZED: "E401",
  FORBIDDEN: "E403",
  
  // Not Found Errors (404)
  NOT_FOUND: "E404",
  USER_NOT_FOUND: "E404U",
  PROJECT_NOT_FOUND: "E404P",
  TASK_NOT_FOUND: "E404T",
  ORDER_NOT_FOUND: "E404O",
  
  // Conflict Errors (409)
  CONFLICT: "E409",
  DUPLICATE_RESOURCE: "E409D",
  
  // Server Errors (500)
  INTERNAL_ERROR: "E500",
  DATABASE_FAILURE: "E501",
  EXTERNAL_SERVICE_ERROR: "E502",
  
  // Resource-specific Errors
  USER_CREATION_FAILED: "E1001",
  USER_UPDATE_FAILED: "E1002",
  USER_DELETE_FAILED: "E1003",
  
  PROJECT_CREATION_FAILED: "E2001",
  PROJECT_UPDATE_FAILED: "E2002",
  PROJECT_DELETE_FAILED: "E2003",
  
  TASK_CREATION_FAILED: "E3001",
  TASK_UPDATE_FAILED: "E3002",
  TASK_DELETE_FAILED: "E3003",
  
  ORDER_CREATION_FAILED: "E4001",
  ORDER_UPDATE_FAILED: "E4002",
  ORDER_DELETE_FAILED: "E4003",
  
  // Business Logic Errors
  INVALID_USER_ID: "E9001",
  INVALID_PROJECT_ID: "E9002",
  INVALID_TASK_ID: "E9003",
  INVALID_ORDER_ID: "E9004",
  INVALID_AMOUNT: "E9005",
  INVALID_DATE: "E9006",
} as const;

export type ErrorCodeType = typeof ERROR_CODES[keyof typeof ERROR_CODES];
