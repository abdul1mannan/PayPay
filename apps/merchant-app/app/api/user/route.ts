import { NextResponse } from "next/server";
import getServerSession from "next-auth/next";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (session.user) {
    return NextResponse.json({
      user: session.user,
    });
  }
  return NextResponse.json(
    {
      message: "You are not Logged in",
    },
    { status: 403 }
  );
};
