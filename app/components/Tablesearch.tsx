import Image from "next/image";
import React from "react";

const Tablesearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-1 ring-gray-300 px-3 py-2">
      <Image src="/search.png" alt="Search" width={18} height={18} />

      <input
        type="text"
        placeholder="Search..."
        className="
              w-full
              md:w-[220px]
              bg-transparent
              outline-none
              text-sm
            "
      />
    </div>
  );
};

export default Tablesearch;
