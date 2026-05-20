import Announcements from "@/app/components/Announcements";
import BigCalender from "@/app/components/BigCalender";
import EventCalender from "@/app/components/EventCalender";
import React from "react";

const students = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className=" text-xl font-semibold ">Students (4A)</h1>
          <BigCalender />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3">
        <EventCalender />
        <Announcements />
      </div>
    </div>
  );
};

export default students;
