"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { PrismaClient } from "@abdul1mannan/db/client";
const db = new PrismaClient();
export async function createOnRamptransactions(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString(36).substring(7);
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  await db.onRampTransaction.create({
    data: {
      amount: amount * 100,
      userId,
      status: "Pending",
      startTime: new Date(),
      provider,
      token: token,
    },
  });
  return {
    message: "Transaction created",
  };
}
