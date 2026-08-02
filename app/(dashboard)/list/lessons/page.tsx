import FormContainer from "@/app/components/FormContainer";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma } from "@/app/generated/prisma/client";
import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type LessonLists = {
  id: number;
  name: string;
  day: string;
  startTime: Date;
  endTime: Date;
  subjectId: number;
  classId: number;
  teacherId: string;
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: LessonLists, canManage: boolean) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.name + " " + item.teacher.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {canManage && (
          <>
            <FormContainer table="lesson" type="update" data={item} />
            <FormContainer table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "desc" ? "desc" : "asc";
  const session = await getSession();
  const canManage = session?.role === "admin";

  // URL PARAMS CONDITON

  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          case "sort":
            break;
        }
      }
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, classes, teachers] = await Promise.all([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { name: sortOrder },
    }),
    prisma.lesson.count({ where: query }),
    prisma.class.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex items-center gap-4">
          <TableActions
            filters={[
              {
                label: "Class",
                param: "classId",
                options: classes.map((classItem) => ({
                  label: classItem.name,
                  value: classItem.id.toString(),
                })),
              },
              {
                label: "Teacher",
                param: "teacherId",
                options: teachers.map((teacher) => ({
                  label: `${teacher.name} ${teacher.surname}`,
                  value: teacher.id,
                })),
              },
            ]}
          />
          {canManage && <FormContainer table="lesson" type="create" />}
        </div>
      </div>
      {/* LIST */}
      <Table
        columns={columns}
        renderRow={(item) => renderRow(item, canManage)}
        data={data}
      />
      {/* PAGINATION */}
      <Pagination pageNumber={pageNumber} count={count} />
    </div>
  );
};

export default LessonsListPage;
