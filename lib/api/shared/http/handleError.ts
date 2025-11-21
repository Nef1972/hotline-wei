import { NextResponse } from "next/server";
import { AppError } from "@/lib/api/shared/errors/AppError";

export function handleError(error: unknown): Response {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}
