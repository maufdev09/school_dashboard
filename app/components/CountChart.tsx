"use client";

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { RechartsDevtools } from "@recharts/devtools";

const data = [
  {
    name: "total",
    count: 106,
    fill: "white",
  },
  {
    name: "girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const SimpleRadialBarChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 h-full flex flex-col overflow-hidden">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Students</h2>

        <Image src="/moreDark.png" alt="Students" width={20} height={20} />
      </div>

      {/* Chart */}
      <div className="relative w-full h-[300px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="90%"
            barSize={18}
            data={data}
          >
            <RadialBar background dataKey="count" />

            <Tooltip />

            <RechartsDevtools />
          </RadialBarChart>
        </ResponsiveContainer>

        <Image
          src="/maleFemale.png"
          alt="Students"
          width={50}
          height={50}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Bottom */}
      <div className="mt-4 flex justify-center gap-12 ">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">1,233</h1>
          <h2 className="text-xs text-gray-500">Boys (50%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">1,233</h1>
          <h2 className="text-xs text-gray-500">Girls (50%)</h2>
        </div>
      </div>
    </div>
  );
};

export default SimpleRadialBarChart;
