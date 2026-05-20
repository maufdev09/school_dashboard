import React from "react";
import UserCard from "@/app/components/UserCard";
import CountChart from "@/app/components/CountChart";
import AttendenceChart from "@/app/components/AttendenceChart";
import FinanceChart from "@/app/components/FinanceChart";
import EventCalender from "@/app/components/EventCalender";
import Announcements from "@/app/components/Announcements";

const admin = () => {
  return (
    <div className=" p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className=" w-full lg:w-2/3">
        <div className="flex  gap-4  justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* Chart */}
        <div className="flex flex-col gap-4 mt-4 lg:flex-row">
          <div className="w-full lg:w-1/3 h-[500px] mt-4">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[500px] mt-4">
            <AttendenceChart />
          </div>
        </div>
        <div className="w-full mt-4">
          <FinanceChart />
        </div>
      </div>
      {/* right */}
      <div className=" w-full lg:w-1/3 flex flex-col gap-8">
        <div className="w-full mt-4">
          <EventCalender />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default admin;
