import React from "react";

const Pagination = ({
  count,
  pageNumber,
}: {
  count: number;
  pageNumber: number;
}) => {
  console.log(count, pageNumber);

  return (
    <div className="flex items-center gap-2 justify-between  text-gray-500">
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        Prev
      </button>
      <div className="text-xs font-semibold">
        <button className="px-3 py-1 rounded-md bg-lamaYellow text-white">
          1
        </button>
        <button className="px-3 py-1 rounded-md hover:bg-gray-300">2</button>
        <button className="px-3 py-1 rounded-md hover:bg-gray-300">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 rounded-md hover:bg-gray-300">10</button>
      </div>

      <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
