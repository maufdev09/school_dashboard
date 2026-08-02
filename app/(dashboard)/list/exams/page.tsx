import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type ExamList = {
  id: number;
  startTime: Date;
  lesson: {
    subject: { name: string };
    class: { name: string };
    teacher: { name: string; surname: string };
  };
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
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.lesson?.subject.name}</td>
    <td>{item.lesson?.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson?.teacher.name} {item.lesson?.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {/* {role === "admin" ||
          (role === "teacher" && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          ))} */}
      </div>
    </td>
  </tr>
);

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "desc" ? "desc" : "asc";

  // URL PARAMS CONDITON

  const query: Prisma.ExamWhereInput = {};

  query.lesson = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          case "sort":
            break;
          default:
            break;
        }
      }
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, classes, teachers] = await Promise.all([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { startTime: sortOrder },
    }),
    prisma.exam.count({ where: query }),
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
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
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
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination pageNumber={pageNumber} count={count} />
    </div>
  );
};

export default ExamListPage;
