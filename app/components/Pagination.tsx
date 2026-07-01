"use client";

import React from "react";
import { ItemPerPage } from "../lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({
  count,
  pageNumber,
}: {
  count: number;
  pageNumber: number;
}) => {
  const router = useRouter();
  const changePage = (newpage: number) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", newpage.toString());

    router.push(`${window.location.pathname}?${queryParams}`);
  };
  return (
    <div className="flex items-center gap-2 justify-between  text-gray-500">
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        Prev
      </button>
      <div className="text-xs font-semibold">
        {Array.from(
          { length: Math.ceil(count / ItemPerPage) },

          (_, index) => (
            <button
              onClick={() => changePage(index + 1)}
              key={index + 1}
              className={`px-3 py-1 rounded-md ${pageNumber === index + 1 ? "bg-lamaYellow text-white" : "bg-slate-200 text-gray-500"} hover:bg-gray-300`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>

      <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
