import { NextResponse } from "next/server";

export const NEED_TO_BE_AUTHENTICATED = NextResponse.json(
  { error: "Vous devez être connecté pour effectuer cette action." },
  { status: 401 },
);
