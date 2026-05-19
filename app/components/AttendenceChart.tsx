"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import Image from "next/image";

const data = [
  {
    name: "Sat",
    present: 39,
    absent: 40,
  },
  {
    name: "Sun",
    present: 30,
    absent: 13,
  },
  {
    name: "Mon",
    present: 20,
    absent: 98,
  },
  {
    name: "Tue",
    present: 27,

    absent: 39,
  },
  {
    name: "Wed",
    present: 18,
    absent: 48,
  },
  {
    name: "Thu",
    present: 23,

    absent: 38,
  },
  {
    name: "Fri",
    present: 34,
    absent: 43,
  },
];

const AttendenceChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg p-4 h-[75%]">
      <div className="flex items-center justify-between">
        <h1 className=" text-lg font-semibold mb-4">Weekly Attendence</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>

      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        barSize={10}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingBottom: "20px" }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
        />

        <Bar
          dataKey="present"
          fill="#FAE27C"
          activeBar={{ fill: "pink", stroke: "blue" }}
          radius={[10, 10, 0, 0]}
          legendType="circle"
        />
        <Bar
          dataKey="absent"
          fill="#C3EBFA"
          activeBar={{ fill: "gold", stroke: "purple" }}
          radius={[10, 10, 0, 0]}
          legendType="circle"
        />
        <RechartsDevtools />
      </BarChart>
    </div>
  );
};

export default AttendenceChart;
