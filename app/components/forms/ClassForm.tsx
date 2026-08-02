import { createClass, updateClass } from "@/app/lib/actions";

type ClassFormData = {
  id?: number;
  name?: string;
  capacity?: number;
  gradeId?: number;
  supervisorId?: string | null;
};

type RelatedData = {
  grades?: { id: number; level: number }[];
  teachers?: { id: string; name: string; surname: string }[];
};

const ClassForm = ({
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: ClassFormData;
  relatedData?: RelatedData;
}) => {
  const action = type === "create" ? createClass : updateClass;

  return (
    <form action={action} className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update class"}
      </h1>
      {data?.id && <input type="hidden" name="id" value={data.id} />}
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class name</label>
          <input
            name="name"
            required
            defaultValue={data?.name}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Capacity</label>
          <input
            name="capacity"
            type="number"
            min={1}
            required
            defaultValue={data?.capacity}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            name="gradeId"
            required
            defaultValue={data?.gradeId}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select grade</option>
            {relatedData?.grades?.map((grade) => (
              <option key={grade.id} value={grade.id}>
                Grade {grade.level}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            name="supervisorId"
            defaultValue={data?.supervisorId ?? ""}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">No supervisor</option>
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

export default ClassForm;
