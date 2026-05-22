import Tablesearch from "@/app/components/Tablesearch";
import Image from "next/image";
import React from "react";

const TeachersListPage = () => {
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
      <div className="classNmae"></div>
      {/* pagination */}
      <div className="classNmae"></div>
    </div>
  );
};

export default TeachersListPage;
