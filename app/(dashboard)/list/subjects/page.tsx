import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma, Subject, Teacher } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },

  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {/* {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={item} />
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )} */}
      </div>
    </td>
  </tr>
);

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "desc" ? "desc" : "asc";

  // URL PARAMS CONDITON

  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          case "teacherId":
            query.teachers = { some: { id: value } };
            break;
          case "sort":
            break;
        }
      }
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, teachers] = await Promise.all([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { name: sortOrder },
    }),
    prisma.subject.count({ where: query }),
    prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <TableActions
          filters={[
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

export default SubjectListPage;
