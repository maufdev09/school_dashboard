import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableActions from "@/app/components/TableActions";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";

type MessageList = {
  id: number;
  title: string;
  description: string;
  date: Date;
  class: { name: string } | null;
};

const columns = [
  { header: "Message", accessor: "message" },
  {
    header: "Audience",
    accessor: "audience",
    className: "hidden md:table-cell",
  },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
];

const renderRow = (item: MessageList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="p-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{item.title}</span>
        <span className="text-xs text-gray-500">{item.description}</span>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.class?.name ?? "All classes"}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <span className="rounded-full bg-lamaYellowLight px-3 py-1 text-xs font-semibold text-yellow-700">
        Sent
      </span>
    </td>
  </tr>
);

const MessagesListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const pageNumber = page ? parseInt(page) : 1;
  const sortOrder: Prisma.SortOrder =
    queryParams.sort === "asc" ? "asc" : "desc";

  const query: Prisma.AnnouncementWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;

    switch (key) {
      case "classId":
        query.classId = parseInt(value);
        break;
      case "search":
        query.OR = [
          { title: { contains: value, mode: "insensitive" } },
          { description: { contains: value, mode: "insensitive" } },
        ];
        break;
      case "sort":
        break;
    }
  }

  // Run queries in parallel without transaction to avoid connection pool exhaustion
  const [data, count, classes] = await Promise.all([
    prisma.announcement.findMany({
      where: query,
      include: { class: { select: { name: true } } },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
      orderBy: { date: sortOrder },
    }),
    prisma.announcement.count({ where: query }),
    prisma.class.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Messages</h1>
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
          ]}
        />
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination count={count} pageNumber={pageNumber} />
    </div>
  );
};

export default MessagesListPage;
