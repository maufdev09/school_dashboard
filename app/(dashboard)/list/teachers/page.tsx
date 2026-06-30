import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Tablesearch from "@/app/components/Tablesearch";
import { Teacher } from "@/app/generated/prisma/client";
import { role, teachersData } from "@/app/lib/data";
import { prisma } from "@/app/lib/prisma";
import { ItemPerPage } from "@/app/lib/settings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const columns = [
  {
    header: "Info",
    accessor: "username",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher ID",
    accessor: "id",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type TeacherList = Teacher & {
  subjects: { name: string }[];
  classes: { name: string }[];
};

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className=" flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt={item.name}
        width={42}
        height={42}
        className="rounded-full object-cover md:hidden xl:block w-10 h-10"
      />
      <div className="ml-2 flex flex-col">
        <div className="text-sm font-medium">{item.name}</div>
        <div className="text-xs text-gray-500">{item.email}</div>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.id}</td>
    <td className="hidden md:table-cell">
      {item.subjects.map((subject) => subject.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((cls) => cls.name).join(",")}
    </td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2 self-end">
        <Link href={`/dashboard/teachers/${item.id}`}>
          <button className=" w-8 h-8  items-center  justify-center  bg-lamaSky p-2 rounded-full">
            <Image src="/view.png" alt="add" width={14} height={14} />
          </button>
        </Link>
        {role === "admin" && (
          <button className=" w-8 h-8  items-center  justify-center  bg-lamaPurple p-2 rounded-full">
            <Image src="/delete.png" alt="add" width={14} height={14} />
          </button>
        )}
      </div>
    </td>
  </tr>
);

const TeachersListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      take: ItemPerPage,
      skip: (pageNumber - 1) * ItemPerPage,
    }),
    prisma.teacher.count(),
  ]);

  // console.log(data);

  return (
    <div className="bg-white p-4 rounded-md m-4 flex-1 mt-0">
      {/* top */}
      <div className=" flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>

        <div className=" flex flex-col md:flex-row items-center  w-full md:w-auto  mb-4 gap-2">
          <Tablesearch />
          <div className="flex items-center gap-4 self-end">
            <button className=" w-8 h-8  items-center  justify-center  bg-lamaYellow p-2 rounded-full">
              <Image src="/filter.png" alt="add" width={14} height={14} />
            </button>
            <button className=" w-8 h-8  items-center  justify-center  bg-lamaYellow p-2 rounded-full">
              <Image src="/sort.png" alt="add" width={14} height={14} />
            </button>
            <button className=" w-8 h-8  items-center  justify-center  bg-lamaYellow p-2 rounded-full">
              <Image src="/plus.png" alt="add" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* list */}
      <div className="classNmae">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>
      {/* pagination */}
      <div className="classNmae">
        <Pagination count={count} pageNumber={pageNumber} />
      </div>
    </div>
  );
};

export default TeachersListPage;
