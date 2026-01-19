# Database Setup Guide

## Prerequisites

- Node.js and npm installed
- Supabase account with a PostgreSQL database
- Supabase database connection string

## Step-by-Step Setup

### Step 1: Install Dependencies

Dependencies should already be installed. If not, run:

```bash
npm install
```

This installs:
- `prisma` (dev dependency)
- `@prisma/client` (runtime dependency)
- `tsx` (for running TypeScript seed files)

### Step 2: Configure Database Connection

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. The `.env` file has been pre-configured with your Supabase connection string:
   ```
   DATABASE_URL="postgresql://postgres:F0Gj3lLLT4LhQNbM@db.bxzsooxuhsrfvhvkgkyn.supabase.co:5432/postgres"
   ```

   ✅ **Connection string is already set up!** You can proceed to the next step.

   If you need to update it later:
   - Go to your Supabase project dashboard
   - Navigate to Settings → Database
   - Copy the "Connection string" under "Connection parameters"
   - Update the password in `.env` if it changes

### Step 3: Generate Prisma Client

Generate the Prisma Client based on your schema:

```bash
npm run db:generate
```

This creates the TypeScript types and client methods based on your schema.

### Step 4: Create Database Migration

Create and apply the initial migration to set up all tables in your Supabase database:

```bash
npm run db:migrate
```

When prompted, enter a migration name (e.g., `init_schema`).

This will:
- Create a migration file in `prisma/migrations/`
- Apply the migration to your Supabase database
- Create all tables: `User`, `Location`, `ClimateMetric`, `ClimateRecord`

### Step 5: Seed Sample Data

Populate the database with sample data:

```bash
npm run db:seed
```

This creates:
- 3 sample locations (Chennai, Mumbai, New Delhi)
- 4 climate metrics (Temperature, Humidity, Rainfall, Air Quality Index)
- Multiple climate records across different dates
- 1 sample user

### Step 6: Verify Setup

#### Option A: Using Prisma Studio (Recommended)

Open Prisma Studio to visually inspect your database:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables
- Browse records
- Edit data
- Verify relationships

#### Option B: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Verify you see these tables:
   - `User`
   - `Location`
   - `ClimateMetric`
   - `ClimateRecord`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma Client from schema |
| `npm run db:migrate` | Create and apply database migrations |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:seed` | Seed database with sample data |

## Schema Overview

The database consists of 4 main tables:

1. **User** - Application users
2. **Location** - Geographic locations (country, state, city)
3. **ClimateMetric** - Types of measurements (Temperature, Humidity, etc.)
4. **ClimateRecord** - Individual data points linking locations and metrics

See `prisma/README.md` for detailed schema documentation.

## Troubleshooting

### Connection Error

If you get a connection error:
- Verify your `DATABASE_URL` in `.env` is correct
- Check that your Supabase database is running
- Ensure your IP is allowed in Supabase network settings

### Migration Errors

If migrations fail:
- Check that you have the correct database permissions
- Verify the database exists in Supabase
- Try resetting: `npx prisma migrate reset` (⚠️ This deletes all data)

### Seed Script Errors

If seeding fails:
- Ensure migrations have been applied first
- Check that the database connection is working
- Verify Prisma Client is generated: `npm run db:generate`

## Next Steps

After setup:
1. Review the schema in `prisma/schema.prisma`
2. Read the detailed documentation in `prisma/README.md`
3. Start using Prisma Client in your Next.js API routes
4. Customize the seed data in `prisma/seed.ts` as needed

## Production Considerations

For production:
- Use environment-specific `.env` files
- Set up database backups in Supabase
- Configure connection pooling for better performance
- Use Supabase connection pooling URL if available
- Enable SSL in production (Supabase uses SSL by default)

