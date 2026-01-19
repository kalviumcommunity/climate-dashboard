# Climate Dashboard (Next.js + TypeScript)

## 📌 Project Overview
This is a simple Climate Dashboard built using **Next.js (App Router)** and **TypeScript**.  
The project follows a clean and scalable folder structure to support future growth and includes a comprehensive RESTful API.

---

## 📁 Folder Structure Explanation

src/app/
- Contains routes, pages, layouts, and API routes
- Uses Next.js App Router for better performance and scalability

src/components/
- Stores reusable UI components
- Helps avoid code duplication

src/lib/
- Contains helper functions, utilities, and configuration files
- Keeps business logic separate from UI

---

## 🌐 RESTful API Documentation

### Global Response Handler

All API endpoints use a unified response format for consistency and better developer experience:

#### Response Structure
```json
{
  "success": boolean,
  "message": string,
  "data"?: any,
  "error"?: {
    "code": string,
    "details"?: any
  },
  "timestamp": string
}
```

#### Success Response Example
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-12T09:35:33.660Z"
  },
  "timestamp": "2024-01-12T09:35:33.660Z"
}
```

#### Error Response Example
```json
{
  "success": false,
  "message": "Name and email are required",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "required": ["name", "email"],
      "received": {"name": null}
    }
  },
  "timestamp": "2024-01-12T09:35:33.660Z"
}
```

### Error Codes
The API uses standardized error codes for better debugging and monitoring:

| Code | Description | HTTP Status |
|------|-------------|-------------|
| E001 | Validation Error | 400 |
| E002 | Missing Required Field | 400 |
| E404 | Not Found | 404 |
| E404U | User Not Found | 404 |
| E404P | Project Not Found | 404 |
| E404T | Task Not Found | 404 |
| E404O | Order Not Found | 404 |
| E500 | Internal Error | 500 |
| E1001 | User Creation Failed | 500 |
| E2001 | Project Creation Failed | 500 |
| E3001 | Task Creation Failed | 500 |
| E4001 | Order Creation Failed | 500 |

### API Route Hierarchy
```
/api/
├── users/
│   ├── route.ts          # GET, POST
│   └── [id]/
│       └── route.ts      # GET, PUT, PATCH, DELETE
│       └── orders/
│           └── route.ts  # GET, POST (nested)
├── projects/
│   ├── route.ts          # GET, POST
│   └── [id]/
│       └── route.ts      # GET, PUT, PATCH, DELETE
├── tasks/
│   ├── route.ts          # GET, POST
│   └── [id]/
│       └── route.ts      # GET, PUT, PATCH, DELETE
└── orders/
    ├── route.ts          # GET, POST
    └── [id]/
        └── route.ts      # GET, PUT, PATCH, DELETE
```

### HTTP Methods and Resource Actions

#### Users API
- `GET /api/users` - Get all users (with pagination)
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get a specific user
- `PUT /api/users/[id]` - Update a user completely
- `PATCH /api/users/[id]` - Partially update a user
- `DELETE /api/users/[id]` - Delete a user

#### Projects API
- `GET /api/projects` - Get all projects (with filtering by status, userId)
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a project completely
- `PATCH /api/projects/[id]` - Partially update a project
- `DELETE /api/projects/[id]` - Delete a project

#### Tasks API
- `GET /api/tasks` - Get all tasks (with filtering by status, priority, projectId, assignedTo)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task completely
- `PATCH /api/tasks/[id]` - Partially update a task
- `DELETE /api/tasks/[id]` - Delete a task

#### Orders API
- `GET /api/orders` - Get all orders (with filtering by status, userId)
- `POST /api/orders` - Create a new order
- `GET /api/orders/[id]` - Get a specific order
- `PUT /api/orders/[id]` - Update an order completely
- `PATCH /api/orders/[id]` - Partially update an order
- `DELETE /api/orders/[id]` - Delete an order

#### Nested Routes
- `GET /api/users/[id]/orders` - Get all orders for a specific user
- `POST /api/users/[id]/orders` - Create a new order for a specific user

### Example Requests & Responses

#### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Response:
```json
{
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-12T09:35:33.660Z"
  }
}
```

#### Get Users with Pagination
```bash
curl "http://localhost:3000/api/users?page=1&limit=10"
```

#### Get Tasks with Filters
```bash
curl "http://localhost:3000/api/tasks?status=in_progress&priority=high&assignedTo=1"
```

### Pagination & Filtering
All GET endpoints support:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- Resource-specific filters (status, userId, etc.)

### Error Handling
- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

### Developer Experience & Observability Benefits

The global response handler provides several key benefits:

#### 🎯 Improved Developer Experience
- **Consistent API responses** - Every endpoint follows the same format
- **Predictable error handling** - Standardized error codes and messages
- **Self-documenting API** - Clear response structure reduces learning curve
- **Better debugging** - Detailed error information with context

#### 📊 Enhanced Observability
- **Centralized error tracking** - Easy to integrate with monitoring tools
- **Structured logging** - Consistent format for logs and analytics
- **Error code tracking** - Monitor specific error types across the application
- **Timestamp tracking** - Precise timing for debugging and performance analysis

#### 🔧 Maintenance Benefits
- **Single source of truth** - Response logic centralized in one place
- **Easy updates** - Change response format globally in one file
- **Reduced code duplication** - No repetitive response handling code
- **Consistent validation** - Standardized error messages and codes

### Response Handler Usage Examples

#### Example 1 - Users API
```typescript
import { sendSuccess, sendValidationError, sendNotFoundError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return sendValidationError("Name and email are required", {
        required: ['name', 'email'],
        received: body
      });
    }
    // ... create user logic
    return sendSuccess(newUser, "User created successfully", 201);
  } catch (error) {
    return sendValidationError("Invalid JSON payload", error);
  }
}
```

#### Example 2 - Tasks API with Filtering
```typescript
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    let filteredTasks = tasks;
    if (status) filteredTasks = filteredTasks.filter(t => t.status === status);
    if (priority) filteredTasks = filteredTasks.filter(t => t.priority === priority);
    
    return sendSuccess({
      data: filteredTasks,
      pagination: { page, limit, total: filteredTasks.length }
    }, "Tasks fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch tasks", ERROR_CODES.INTERNAL_ERROR, 500, error);
  }
}
```

### Naming Consistency Benefits
- **Predictable endpoints** - Easy to understand and use
- **Self-documenting API** - Clear resource-based naming
- **Reduced integration errors** - Consistent patterns across all endpoints
- **Better maintainability** - Easy to extend and modify

---

## 🧾 Naming Conventions
- Components: PascalCase (e.g., `ClimateCard.tsx`)
- Utility files: camelCase (e.g., `fetchClimate.ts`)
- Folders: lowercase
- API Routes: plural nouns, lowercase (e.g., `/api/users`, `/api/projects`)

---

## 🚀 Scalability Benefits
- Clear separation of concerns
- RESTful API design for easy integration
- Consistent naming and error handling
- Pagination and filtering support
- Easy to add new resources following established patterns
- Improves readability and maintainability for teams

---

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
```

The API will be available at `http://localhost:3000/api/`