import { z } from "zod";

export const stationCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  latitude: z
    .number()
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
  status: z.enum(["active", "inactive", "maintenance"]).optional(),
});

export const stationUpdateSchema = stationCreateSchema.partial();

export type StationCreateInput = z.infer<typeof stationCreateSchema>;
export type StationUpdateInput = z.infer<typeof stationUpdateSchema>;

