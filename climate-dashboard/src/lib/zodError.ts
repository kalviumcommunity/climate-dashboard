import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleZodError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation Error",
        errors: error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Unexpected error",
    },
    { status: 500 }
  );
}

