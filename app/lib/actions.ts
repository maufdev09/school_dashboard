"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Day } from "../generated/prisma/client";
import { getSession } from "./auth";
import { prisma } from "./prisma";

const requireAdmin = async () => {
  const session = await getSession();

  if (session?.role !== "admin") {
    throw new Error("Only admins can change school records.");
  }
};

const readString = (formData: FormData, key: string) =>
  formData.get(key)?.toString().trim() ?? "";

const readNumber = (formData: FormData, key: string) => {
  const value = Number(readString(formData, key));

  if (!Number.isFinite(value)) {
    throw new Error(`${key} is required.`);
  }

  return value;
};

const readDate = (formData: FormData, key: string) => {
  const value = readString(formData, key);
  const date = new Date(value);

  if (!value || Number.isNaN(date.getTime())) {
    throw new Error(`${key} is required.`);
  }

  return date;
};

export const createClass = async (formData: FormData) => {
  await requireAdmin();

  const supervisorId = readString(formData, "supervisorId");

  await prisma.class.create({
    data: {
      name: readString(formData, "name"),
      capacity: readNumber(formData, "capacity"),
      gradeId: readNumber(formData, "gradeId"),
      supervisorId: supervisorId || null,
    },
  });

  revalidatePath("/list/classes");
  redirect("/list/classes");
};

export const updateClass = async (formData: FormData) => {
  await requireAdmin();

  const id = readNumber(formData, "id");
  const supervisorId = readString(formData, "supervisorId");

  await prisma.class.update({
    where: { id },
    data: {
      name: readString(formData, "name"),
      capacity: readNumber(formData, "capacity"),
      gradeId: readNumber(formData, "gradeId"),
      supervisorId: supervisorId || null,
    },
  });

  revalidatePath("/list/classes");
  redirect("/list/classes");
};

export const deleteClass = async (formData: FormData) => {
  await requireAdmin();

  const id = readNumber(formData, "id");
  const dependencies = await prisma.class.findUnique({
    where: { id },
    select: {
      _count: {
        select: {
          students: true,
          lessons: true,
          events: true,
          announcements: true,
        },
      },
    },
  });

  const count = dependencies?._count;

  if (
    count &&
    (count.students > 0 ||
      count.lessons > 0 ||
      count.events > 0 ||
      count.announcements > 0)
  ) {
    throw new Error("Move or delete related records before deleting this class.");
  }

  await prisma.class.delete({ where: { id } });

  revalidatePath("/list/classes");
  redirect("/list/classes");
};

export const createLesson = async (formData: FormData) => {
  await requireAdmin();

  await prisma.lesson.create({
    data: {
      name: readString(formData, "name"),
      day: readString(formData, "day") as Day,
      startTime: readDate(formData, "startTime"),
      endTime: readDate(formData, "endTime"),
      subjectId: readNumber(formData, "subjectId"),
      classId: readNumber(formData, "classId"),
      teacherId: readString(formData, "teacherId"),
    },
  });

  revalidatePath("/list/lessons");
  redirect("/list/lessons");
};

export const updateLesson = async (formData: FormData) => {
  await requireAdmin();

  const id = readNumber(formData, "id");

  await prisma.lesson.update({
    where: { id },
    data: {
      name: readString(formData, "name"),
      day: readString(formData, "day") as Day,
      startTime: readDate(formData, "startTime"),
      endTime: readDate(formData, "endTime"),
      subjectId: readNumber(formData, "subjectId"),
      classId: readNumber(formData, "classId"),
      teacherId: readString(formData, "teacherId"),
    },
  });

  revalidatePath("/list/lessons");
  redirect("/list/lessons");
};

export const deleteLesson = async (formData: FormData) => {
  await requireAdmin();

  const id = readNumber(formData, "id");
  const [exams, assignments] = await Promise.all([
    prisma.exam.findMany({ where: { lessonId: id }, select: { id: true } }),
    prisma.assignment.findMany({
      where: { lessonId: id },
      select: { id: true },
    }),
  ]);

  const examIds = exams.map((exam) => exam.id);
  const assignmentIds = assignments.map((assignment) => assignment.id);

  await prisma.$transaction([
    prisma.result.deleteMany({
      where: {
        OR: [
          { examId: { in: examIds.length ? examIds : [-1] } },
          { assignmentId: { in: assignmentIds.length ? assignmentIds : [-1] } },
        ],
      },
    }),
    prisma.attendance.deleteMany({ where: { lessonId: id } }),
    prisma.exam.deleteMany({ where: { lessonId: id } }),
    prisma.assignment.deleteMany({ where: { lessonId: id } }),
    prisma.lesson.delete({ where: { id } }),
  ]);

  revalidatePath("/list/lessons");
  redirect("/list/lessons");
};
