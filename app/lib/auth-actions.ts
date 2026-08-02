"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRoleDashboardPath, isRole } from "./auth";

export const login = async (formData: FormData) => {
  const role = formData.get("role");

  if (!isRole(role)) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  cookieStore.set("school_role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect(getRoleDashboardPath(role));
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("school_role");
  redirect("/login");
};
