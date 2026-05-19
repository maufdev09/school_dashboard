"use client";

import Image from "next/image";

const FinanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg p-4 h-[75%]">
      <div className="flex items-center justify-between">
        <h1 className=" text-lg font-semibold mb-4">Weekly Finance</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>

      <div></div>
    </div>
  );
};

export default FinanceChart;
