import { createLesson, updateLesson } from "@/app/lib/actions";

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"] as const;

type LessonFormData = {
  id?: number;
  name?: string;
  day?: string;
  startTime?: Date;
  endTime?: Date;
  subjectId?: number;
  classId?: number;
  teacherId?: string;
};

type RelatedData = {
  subjects?: { id: number; name: string }[];
  classes?: { id: number; name: string }[];
  teachers?: { id: string; name: string; surname: string }[];
};

const formatDateTimeInput = (date?: Date) => {
  if (!date) return "";

  return new Date(date).toISOString().slice(0, 16);
};

const LessonForm = ({
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: LessonFormData;
  relatedData?: RelatedData;
}) => {
  const action = type === "create" ? createLesson : updateLesson;

  return (
    <form action={action} className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new lesson" : "Update lesson"}
      </h1>
      {data?.id && <input type="hidden" name="id" value={data.id} />}
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Lesson name</label>
          <input
            name="name"
            required
            defaultValue={data?.name}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Day</label>
          <select
            name="day"
            required
            defaultValue={data?.day}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Start time</label>
          <input
            name="startTime"
            type="datetime-local"
            required
            defaultValue={formatDateTimeInput(data?.startTime)}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">End time</label>
          <input
            name="endTime"
            type="datetime-local"
            required
            defaultValue={formatDateTimeInput(data?.endTime)}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject</label>
          <select
            name="subjectId"
            required
            defaultValue={data?.subjectId}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select subject</option>
            {relatedData?.subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            name="classId"
            required
            defaultValue={data?.classId}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select class</option>
            {relatedData?.classes?.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teacher</label>
          <select
            name="teacherId"
            required
            defaultValue={data?.teacherId}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select teacher</option>
            {relatedData?.teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
