import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create sample locations
  const chennai = await prisma.location.upsert({
    where: { id: 1 },
    update: {},
    create: {
      country: "India",
      state: "Tamil Nadu",
      city: "Chennai",
      latitude: 13.0827,
      longitude: 80.2707,
    },
  });

  const mumbai = await prisma.location.upsert({
    where: { id: 2 },
    update: {},
    create: {
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      latitude: 19.076,
      longitude: 72.8777,
    },
  });

  const delhi = await prisma.location.upsert({
    where: { id: 3 },
    update: {},
    create: {
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      latitude: 28.6139,
      longitude: 77.209,
    },
  });

  console.log("✅ Created locations:", { chennai, mumbai, delhi });

  // Create climate metrics
  const temperature = await prisma.climateMetric.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Temperature",
      unit: "°C",
      description: "Average daily temperature",
    },
  });

  const humidity = await prisma.climateMetric.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Humidity",
      unit: "%",
      description: "Relative humidity percentage",
    },
  });

  const rainfall = await prisma.climateMetric.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Rainfall",
      unit: "mm",
      description: "Daily rainfall in millimeters",
    },
  });

  const airQuality = await prisma.climateMetric.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Air Quality Index",
      unit: "AQI",
      description: "Air Quality Index (0-500)",
    },
  });

  console.log("✅ Created metrics:", { temperature, humidity, rainfall, airQuality });

  // Create sample climate records
  const records = [
    // Chennai - Temperature records
    {
      date: new Date("2024-01-01"),
      value: 32.5,
      locationId: chennai.id,
      metricId: temperature.id,
    },
    {
      date: new Date("2024-01-02"),
      value: 33.2,
      locationId: chennai.id,
      metricId: temperature.id,
    },
    {
      date: new Date("2024-01-03"),
      value: 31.8,
      locationId: chennai.id,
      metricId: temperature.id,
    },
    // Chennai - Humidity records
    {
      date: new Date("2024-01-01"),
      value: 75.0,
      locationId: chennai.id,
      metricId: humidity.id,
    },
    {
      date: new Date("2024-01-02"),
      value: 78.5,
      locationId: chennai.id,
      metricId: humidity.id,
    },
    // Mumbai - Temperature records
    {
      date: new Date("2024-01-01"),
      value: 28.5,
      locationId: mumbai.id,
      metricId: temperature.id,
    },
    {
      date: new Date("2024-01-02"),
      value: 29.1,
      locationId: mumbai.id,
      metricId: temperature.id,
    },
    // Mumbai - Rainfall records
    {
      date: new Date("2024-01-01"),
      value: 12.5,
      locationId: mumbai.id,
      metricId: rainfall.id,
    },
    // Delhi - Temperature records
    {
      date: new Date("2024-01-01"),
      value: 15.2,
      locationId: delhi.id,
      metricId: temperature.id,
    },
    {
      date: new Date("2024-01-02"),
      value: 16.8,
      locationId: delhi.id,
      metricId: temperature.id,
    },
    // Delhi - Air Quality records
    {
      date: new Date("2024-01-01"),
      value: 245,
      locationId: delhi.id,
      metricId: airQuality.id,
    },
    {
      date: new Date("2024-01-02"),
      value: 268,
      locationId: delhi.id,
      metricId: airQuality.id,
    },
  ];

  for (const record of records) {
    await prisma.climateRecord.upsert({
      where: {
        locationId_metricId_date: {
          locationId: record.locationId,
          metricId: record.metricId,
          date: record.date,
        },
      },
      update: {},
      create: record,
    });
  }

  console.log(`✅ Created ${records.length} climate records`);

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: "admin@climatedashboard.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@climatedashboard.com",
    },
  });

  console.log("✅ Created user:", user);
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

