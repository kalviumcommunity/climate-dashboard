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

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
----------------