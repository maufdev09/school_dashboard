"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { deleteClass, deleteLesson } from "../lib/actions";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});

export type FormTable =
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";

type FormRecord = Record<string, unknown>;
type RelatedData = Record<string, unknown>;

const forms: {
  [key: string]: (
    type: "create" | "update",
    data?: FormRecord,
    relatedData?: RelatedData,
  ) => React.ReactElement;
} = {
  teacher: (type, data, relatedData) => (
    <TeacherForm type={type} data={data} relatedData={relatedData} />
  ),
  student: (type, data, relatedData) => (
    <StudentForm type={type} data={data} relatedData={relatedData} />
  ),
  class: (type, data, relatedData) => (
    <ClassForm type={type} data={data} relatedData={relatedData} />
  ),
  lesson: (type, data, relatedData) => (
    <LessonForm type={type} data={data} relatedData={relatedData} />
  ),
};

const deleteActions: Partial<Record<FormTable, (formData: FormData) => void>> =
  {
    class: deleteClass,
    lesson: deleteLesson,
  };

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: {
  table: FormTable;
  type: "create" | "update" | "delete";
  data?: FormRecord;
  id?: number | string;
  relatedData?: RelatedData;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";
  const iconName =
    type === "create" ? "plus" : type === "update" ? "edit" : "delete";

  const [open, setOpen] = useState(false);
  const deleteAction = deleteActions[table];

  const formContent =
    type === "delete" && id ? (
      <form action={deleteAction} className="p-4 flex flex-col gap-4">
        <input type="hidden" name="id" value={id} />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        {deleteAction ? (
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        ) : (
          <span className="text-center text-sm text-gray-500">
            Delete is not configured for this table yet.
          </span>
        )}
      </form>
    ) : type === "create" || type === "update" ? (
      (forms[table]?.(type, data, relatedData) ?? "Form not found!")
    ) : (
      "Form not found!"
    );

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
        aria-label={`${type} ${table}`}
      >
        <Image src={`/${iconName}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {formContent}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
