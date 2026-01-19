import { z } from "zod";

export const readingCreateSchema = z.object({
  stationId: z.string().min(1, "stationId is required"),
  temperature: z.number({
    required_error: "temperature is required",
    invalid_type_error: "temperature must be a number",
  }),
  humidity: z
    .number({
      required_error: "humidity is required",
      invalid_type_error: "humidity must be a number",
    })
    .min(0, "Humidity must be between 0 and 100")
    .max(100, "Humidity must be between 0 and 100"),
  airQuality: z
    .number({
      required_error: "airQuality is required",
      invalid_type_error: "airQuality must be a number",
    })
    .min(0, "Air quality must be between 0 and 500")
    .max(500, "Air quality must be between 0 and 500"),
  rainfall: z
    .number({
      required_error: "rainfall is required",
      invalid_type_error: "rainfall must be a number",
    })
    .min(0, "Rainfall cannot be negative"),
});

export type ReadingCreateInput = z.infer<typeof readingCreateSchema>;

