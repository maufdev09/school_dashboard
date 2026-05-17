"use client";

import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import Image from "next/image";
import { count } from "console";

// #region Sample data
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

// #endregion
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const SimpleRadialBarChart = () => {
  return (
    <div className=" bg-white rounded-2xl p-4 h-[75%]">
      {/* Title */}
      <div className="flex justify-between items-center ">
        <h2 className=" text-xl font-semibold ">Students</h2>
        <Image src="/moreDark.png" alt="Students" width={20} height={20} />
      </div>

      {/* Chart */}

      <div className="  w-full  relative">
        <RadialBarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "80vh",
            aspectRatio: 1.618,
          }}
          responsive
          cx="50%"
          //   cy="50%"
          innerRadius="40%"
          outerRadius="80%"
          barSize={30}
          data={data}
        >
          <RadialBar
            // label={{ position: "insideStart", fill: "#fff" }}
            background
            dataKey="count"
          />
          {/* <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          /> */}

          <Tooltip />

          <RechartsDevtools />
        </RadialBarChart>
        <Image
          src="/maleFemale.png"
          alt="Students"
          width={50}
          height={50}
          className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1]"
        />
      </div>

      {/* Bottom */}
      <div className=" flex justify-center gap-16">
        <div className="flex flex-col gap-1 ">
          <div className="w-5 h-5 bg-lamaSky rounded-full"></div>
          <h1 className=" font-bold">1,233</h1>
          <h2 className=" text-xs text-gray-500">Boys (50%)</h2>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="w-5 h-5 bg-lamaYellow rounded-full"></div>
          <h1 className=" font-bold">1,233</h1>
          <h2 className=" text-xs text-gray-500">Girls (50%)</h2>
        </div>
      </div>
    </div>
  );
};

export default SimpleRadialBarChart;
