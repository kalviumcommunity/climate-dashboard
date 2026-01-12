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