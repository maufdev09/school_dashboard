"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white rounded-2xl p-4  flex flex-col ">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Students</h2>

        <Image src="/moreDark.png" alt="Students" width={20} height={20} />
      </div>

      <Calendar onChange={onChange} value={value} />

      {/* Events */}
      <div className="mt-4 flex-1 gap-4 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Events</h2>

          <Image src="/moreDark.png" alt="Students" width={20} height={20} />
        </div>

        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple "
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-600">{event.title}</h3>
              <p className="text-xs text-gray-600">{event.time}</p>
            </div>

            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
