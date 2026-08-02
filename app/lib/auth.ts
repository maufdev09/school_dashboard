import { cookies } from "next/headers";

export const roles = ["admin", "teacher", "student", "parent"] as const;

export type Role = (typeof roles)[number];

export type Session = {
  role: Role;
  userId: string;
  name: string;
};

const demoUsers: Record<Role, Session> = {
  admin: { role: "admin", userId: "admin1", name: "School Admin" },
  teacher: { role: "teacher", userId: "teacher1", name: "Teacher One" },
  student: { role: "student", userId: "student1", name: "Student One" },
  parent: { role: "parent", userId: "parentId1", name: "Parent One" },
};

export const isRole = (value: unknown): value is Role =>
  typeof value === "string" && roles.includes(value as Role);

export const getRoleDashboardPath = (role: Role) => {
  switch (role) {
    case "student":
      return "/students";
    case "parent":
      return "/parents";
    default:
      return `/${role}`;
  }
};

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const role = cookieStore.get("school_role")?.value;

  if (!isRole(role)) {
    return null;
  }

  return demoUsers[role];
};

export const getDemoSession = (role: Role) => demoUsers[role];
