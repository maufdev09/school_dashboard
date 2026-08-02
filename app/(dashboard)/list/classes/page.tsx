import FormContainer from "@/app/components/FormContainer";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import {
  Class as PrismaClass,
  Prisma,
  Teacher,
} from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";
import { getSession } from "@/app/lib/auth";

type ClassList = PrismaClass & { supervisor: Teacher | null };

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ClassList, canManage: boolean) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden md:table-cell">
      {item.supervisor
        ? `${item.supervisor.name} ${item.supervisor.surname}`
        : "-"}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {canManage && (
          <>
            <FormContainer table="class" type="update" data={item} />
            <FormContainer table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ClassListPage = async ({
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

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          case "sort":
            break;
        }
      }
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, teachers] = await Promise.all([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { name: sortOrder },
    }),
    prisma.class.count({ where: query }),
    prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex items-center gap-4">
          <TableActions
            filters={[
              {
                label: "Supervisor",
                param: "supervisorId",
                options: teachers.map((teacher) => ({
                  label: `${teacher.name} ${teacher.surname}`,
                  value: teacher.id,
                })),
              },
            ]}
          />
          {canManage && <FormContainer table="class" type="create" />}
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

export default ClassListPage;
