import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type AttendanceList = {
  id: number;
  date: Date;
  present: boolean;
  student: {
    name: string;
    surname: string;
    class: { name: string };
  };
  lesson: {
    name: string;
    subject: { name: string };
    teacher: { name: string; surname: string };
  };
};

const columns = [
  { header: "Student", accessor: "student" },
  { header: "Subject", accessor: "subject" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden lg:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
];

const renderRow = (item: AttendanceList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      {item.student.name} {item.student.surname}
    </td>
    <td>{item.lesson.subject.name}</td>
    <td className="hidden md:table-cell">{item.student.class.name}</td>
    <td className="hidden lg:table-cell">
      {item.lesson.teacher.name} {item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          item.present
            ? "bg-lamaSkyLight text-sky-700"
            : "bg-red-50 text-red-600"
        }`}
      >
        {item.present ? "Present" : "Absent"}
      </span>
    </td>
  </tr>
);

const AttendanceListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "asc" ? "asc" : "desc";

  const query: Prisma.AttendanceWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;

    switch (key) {
      case "studentId":
        query.studentId = value;
        break;
      case "classId":
        query.student = { classId: parseInt(value) };
        break;
      case "teacherId":
        query.lesson = { teacherId: value };
        break;
      case "search":
        query.OR = [
          { student: { name: { contains: value, mode: "insensitive" } } },
          { student: { surname: { contains: value, mode: "insensitive" } } },
          {
            lesson: {
              subject: { name: { contains: value, mode: "insensitive" } },
            },
          },
        ];
        break;
      case "sort":
        break;
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, classes, teachers] = await Promise.all([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: {
          select: {
            name: true,
            surname: true,
            class: { select: { name: true } },
          },
        },
        lesson: {
          select: {
            name: true,
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { date: sortOrder },
    }),
    prisma.attendance.count({ where: query }),
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
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Attendance
        </h1>
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
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination count={count} pageNumber={pageNumber} />
    </div>
  );
};

export default AttendanceListPage;
