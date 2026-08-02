import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("school_role");

  return response;
};
