# Climate Dashboard (Next.js + TypeScript)

## 📌 Project Overview
This is a simple Climate Dashboard built using **Next.js (App Router)** and **TypeScript**.  
The project follows a clean and scalable folder structure to support future growth.

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
## 🧹 Code Quality & Consistency

### Strict TypeScript
Strict TypeScript mode is enabled to catch bugs at compile time.  
Rules like `noImplicitAny` and `noUnusedLocals` prevent unsafe and unused code.

### ESLint + Prettier
ESLint enforces coding best practices, while Prettier ensures consistent formatting.  
Both tools are integrated to avoid conflicts and maintain clean code.

### Pre-Commit Hooks
Husky and lint-staged run linting and formatting checks before every commit.  
This ensures only clean, consistent, and error-free code is committed.

## 🧾 Naming Conventions
- Components: PascalCase (e.g., `ClimateCard.tsx`)
- Utility files: camelCase (e.g., `fetchClimate.ts`)
- Folders: lowercase

---
## 🚨 Centralized Error Handling

This Climate Dashboard implements a comprehensive centralized error handling system that ensures consistent, secure, and observable error management across all API routes.

### Why Centralized Error Handling Matters

Modern web applications can fail in many ways — from API timeouts to database issues. Without a centralized strategy, errors become scattered, logs inconsistent, and debugging difficult.

Our centralized error handler ensures:
- **Consistency**: Every error follows a uniform response format
- **Security**: Sensitive stack traces are hidden in production
- **Observability**: Structured logs make debugging and monitoring easier

### Architecture Overview

```
src/lib/
├── logger.ts          # Structured logging utility
├── errorHandler.ts     # Centralized error handler
└── schemas/           # Zod validation schemas

src/app/api/
├── users/route.ts     # Updated with centralized error handling
├── stations/route.ts  # Updated with centralized error handling
└── test-errors/route.ts # Demonstration endpoint
```

### Logger Utility (`src/lib/logger.ts`)

Structured logging for consistent error tracking:

```typescript
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ 
      level: "info", 
      message, 
      meta, 
      timestamp: new Date().toISOString() 
    }));
  },
  error: (message: string, meta?: any) => {
    console.error(JSON.stringify({ 
      level: "error", 
      message, 
      meta, 
      timestamp: new Date().toISOString() 
    }));
  },
  // ... warn, debug methods
};
```

### Error Handler (`src/lib/errorHandler.ts`)

The error handler classifies and formats errors based on type and environment:

#### Custom Error Classes
- `ValidationError` (400) - Input validation failures
- `AuthenticationError` (401) - Authentication failures  
- `AuthorizationError` (403) - Permission denied
- `NotFoundError` (404) - Resource not found
- `DatabaseError` (500) - Database operation failures
- `ExternalApiError` (502) - External service failures

#### Usage Example
```typescript
import { handleError, ValidationError, DatabaseError } from "@/lib/errorHandler";

export async function GET(request: NextRequest) {
  try {
    // Your API logic here
    if (!user) {
      throw new ValidationError("User ID is required", {
        method: "GET",
        url: "/api/users",
        userId: id
      });
    }
    
    // Simulate database error
    throw new DatabaseError("Connection timeout");
    
  } catch (error) {
    return handleError(error, {
      method: "GET",
      url: "/api/users",
      requestId: "req-123456"
    });
  }
}
```

### Environment-Specific Behavior

| Environment | Behavior |
|-------------|----------|
| **Development** | Shows detailed error messages and stack traces |
| **Production** | Logs detailed errors internally, but sends minimal, user-safe messages |

#### Development Response Example
```json
{
  "success": false,
  "message": "Database connection failed!",
  "stack": "Error: Database connection failed! at ...",
  "timestamp": "2025-01-22T10:30:00.000Z"
}
```

#### Production Response Example
```json
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "timestamp": "2025-01-22T10:30:00.000Z"
}
```

#### Log Output (Both Environments)
```json
{
  "level": "error",
  "message": "Error in GET /api/users",
  "meta": {
    "errorType": "DATABASE_ERROR",
    "statusCode": 500,
    "originalError": {
      "name": "Error",
      "message": "Database connection failed!",
      "stack": "Error: Database connection failed! at ..."
    },
    "method": "GET",
    "url": "/api/users"
  },
  "timestamp": "2025-01-22T10:30:00.000Z"
}
```

### Testing Error Handling

Use the test endpoint to experiment with different error scenarios:

```bash
# Test different error types
curl "http://localhost:3000/api/test-errors?type=validation"
curl "http://localhost:3000/api/test-errors?type=auth"
curl "http://localhost:3000/api/test-errors?type=database"
curl "http://localhost:3000/api/test-errors?type=generic"

# Test POST errors
curl -X POST http://localhost:3000/api/test-errors \
  -H "Content-Type: application/json" \
  -d '{"test": "simulate-db-error"}'
```

Available error types:
- `validation` - Input validation error
- `auth` - Authentication error
- `notfound` - Resource not found
- `database` - Database operation error
- `external` - External API error
- `generic` - Generic error
- `timeout` - Network timeout
- `network` - Network connection error

### Benefits of This Approach

1. **Debugging Efficiency**: Structured logs with consistent format make it easy to search and filter errors
2. **User Trust**: Sensitive information is redacted in production responses
3. **Developer Experience**: Full stack traces available in development
4. **Monitoring Ready**: JSON-formatted logs work seamlessly with log aggregation tools
5. **Extensible**: Easy to add new error types and handling logic

### Extending the Handler

To add custom error types:

```typescript
export class CustomError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 422, "CUSTOM_ERROR", true, context);
  }
}

// Update getErrorType function to handle your new error type
function getErrorType(error: any): ErrorType {
  // ... existing logic
  if (error instanceof CustomError) return "CUSTOM_ERROR";
  return "INTERNAL_SERVER_ERROR";
}
```

---

## 🔐 Environment Variables & Secrets Management

### Environment Files
- `.env.local`  
  Used for actual secrets such as database URLs and API keys.  
  This file is ignored by Git and never committed.

- `.env.example`  
  Acts as a template listing all required environment variables with placeholder values.  
  Helps teammates replicate the setup safely.

### Variable Scope
- Server-side only:
  - `DATABASE_URL`
  - Used in API routes and server components only

- Client-side safe:
  - `NEXT_PUBLIC_API_BASE_URL`
  - Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

### Safety Practices Followed
- Secrets are never accessed in client components
- `.env.local` is protected via `.gitignore`
- Clear separation between runtime secrets and public configuration
- Avoided common pitfalls like missing prefixes and accidental secret exposure


## 🚀 Scalability Benefits
- Clear separation of concerns
- Easy to add new pages, components, or utilities
- Improves readability and maintainability for teams

---

## 🗄️ Database & Prisma (Supabase Postgres)

Prisma ORM is used to manage the Supabase-hosted Postgres database for the Climate Dashboard.

### Environment
- Copy `.env.example` to `.env` (or `.env.local`) and set `DATABASE_URL` to your Supabase connection string:
  ```
  DATABASE_URL="postgresql://postgres:F0Gj3lLLT4LhQNbM@db.bxzsooxuhsrfvhvkgkyn.supabase.co:5432/postgres"
  ```

### Install & Generate Client
```bash
npm install
npm run db:generate   # prisma generate
```

### Migrate & Seed
```bash
npm run db:migrate    # creates/apply migration (use name: init_schema)
npm run db:seed       # seeds sample locations, metrics, records, user
```

### Prisma Client (singleton)
`src/lib/prisma.ts` ensures a single Prisma instance during dev hot reloads:
```
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### Schema (excerpt)
See `prisma/schema.prisma` for the full design:
```
model Location {
  id        Int    @id @default(autoincrement())
  country   String
  state     String?
  city      String
  latitude  Float?
  longitude Float?
  records   ClimateRecord[]
}

model ClimateRecord {
  id         Int      @id @default(autoincrement())
  date       DateTime
  value      Float
  locationId Int
  metricId   Int
  location   Location      @relation(fields: [locationId], references: [id], onDelete: Cascade)
  metric     ClimateMetric @relation(fields: [metricId], references: [id], onDelete: Cascade)
  @@unique([locationId, metricId, date])
  @@index([locationId, metricId, date])
}
```

### Query Example
```
import { prisma } from "@/lib/prisma";

export async function getLatestTemps() {
  return prisma.climateRecord.findMany({
    where: { metric: { name: "Temperature" } },
    orderBy: { date: "desc" },
    include: { location: true, metric: true },
    take: 10,
  });
}
```

### Deliverables Checklist
- Prisma installed and initialized (`prisma/schema.prisma`, `prisma/seed.ts`)
- Prisma Client generated (`npm run db:generate`)
- Migrations applied to Supabase (`npm run db:migrate`)
- Seed data loaded (`npm run db:seed`)
- README documents setup, schema excerpt, and client usage

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
```