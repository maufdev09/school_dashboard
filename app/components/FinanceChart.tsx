"use client";
import {
  LineChart,
  Line,
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
    name: "Jan",
    income: 4000,
    expense: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
    amt: 2000,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
    amt: 2100,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white  w-full rounded-lg p-4 h-[90%]">
      <div className="flex items-center justify-between">
        <h1 className=" text-lg font-semibold mb-4">Weekly Finance</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>

      <div>
        <LineChart
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "75%",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            cursor={{
              stroke: "var(--color-border-2)",
            }}
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: "20px" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#FAE27C"
            dot={{
              fill: "#FAE27C",
            }}
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            dot={{
              fill: "#C3EBFA",
            }}
            strokeWidth={5}
          />
          <RechartsDevtools />
        </LineChart>
      </div>
    </div>
  );
};

export default FinanceChart;
