"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components";

/* ---------- Schema ---------- */
const searchSchema = z.object({
  city: z
    .string()
    .min(2, "City name must be at least 2 characters"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Searching weather for:", data.city);
    alert(`Fetching weather for ${data.city}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Search City Weather</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          label="City Name"
          name="city"
          register={register}
          error={errors.city?.message}
        />

        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}
