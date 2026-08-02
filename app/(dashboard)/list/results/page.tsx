import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type Result = {
  id: number;
  score: number;
  student: { name: string; surname: string; class: { name: string } };
  exam: {
    startTime: Date;
    lesson: {
      subject: { name: string };
      teacher: { name: string; surname: string };
    };
  } | null;
  assignment: {
    dueDate: Date;
    lesson: {
      subject: { name: string };
      teacher: { name: string; surname: string };
    };
  } | null;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
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

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "asc" ? "asc" : "desc";

  const query: Prisma.ResultWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;

    switch (key) {
      case "studentId":
        query.studentId = value;
        break;
      case "search":
        query.OR = [
          { student: { name: { contains: value, mode: "insensitive" } } },
          { exam: { title: { contains: value, mode: "insensitive" } } },
          {
            assignment: { title: { contains: value, mode: "insensitive" } },
          },
        ];
        break;
      case "sort":
        break;
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, students] = await Promise.all([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true, class: true } },
        exam: {
          select: {
            startTime: true,
            lesson: {
              select: {
                subject: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          select: {
            dueDate: true,
            lesson: {
              select: {
                subject: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { id: sortOrder },
    }),
    prisma.result.count({ where: query }),
    prisma.student.findMany({
      select: { id: true, name: true, surname: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const renderRow = (item: Result) => {
    const source = item.exam ?? item.assignment;
    const date = item.exam?.startTime ?? item.assignment?.dueDate;

    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          {source?.lesson.subject.name ?? "-"}
        </td>
        <td>
          {item.student.name} {item.student.surname}
        </td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">
          {source
            ? `${source.lesson.teacher.name} ${source.lesson.teacher.surname}`
            : "-"}
        </td>
        <td className="hidden md:table-cell">{item.student.class.name}</td>
        <td className="hidden md:table-cell">
          {date ? new Intl.DateTimeFormat("en-US").format(date) : "-"}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {/* {role === "admin" || role === "teacher" && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )} */}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <TableActions
          filters={[
            {
              label: "Student",
              param: "studentId",
              options: students.map((student) => ({
                label: `${student.name} ${student.surname}`,
                value: student.id,
              })),
            },
          ]}
        />
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} pageNumber={pageNumber} />
    </div>
  );
};

export default ResultListPage;
