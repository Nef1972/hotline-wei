"use server";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/lib/db";
import { eq } from "drizzle-orm";
import { peoples } from "@/lib/db/schema";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  const people = await database.query.peoples.findFirst({
    where: eq(peoples.userId, userId!),
    with: { role: true },
  });

  if (!people?.role?.hasFullAccess) {
    redirect("/");
  }

  return children;
}
