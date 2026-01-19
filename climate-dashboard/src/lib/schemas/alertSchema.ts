import { z } from "zod";

export const alertCreateSchema = z.object({
  stationId: z.string().min(1, "stationId is required"),
  type: z.enum(["temperature", "rainfall", "airQuality"], {
    required_error: "type is required",
    invalid_type_error:
      "Type must be one of: temperature, rainfall, airQuality",
  }),
  threshold: z
    .number({
      required_error: "threshold is required",
      invalid_type_error: "threshold must be a number",
    })
    .min(0, "Threshold cannot be negative"),
  currentValue: z
    .number({
      required_error: "currentValue is required",
      invalid_type_error: "currentValue must be a number",
    })
    .min(0, "Current value cannot be negative"),
});

export const alertUpdateSchema = z.object({
  status: z.enum(["active", "resolved", "acknowledged"], {
    required_error: "status is required",
    invalid_type_error:
      "Status must be one of: active, resolved, acknowledged",
  }),
});

export type AlertCreateInput = z.infer<typeof alertCreateSchema>;
export type AlertUpdateInput = z.infer<typeof alertUpdateSchema>;

