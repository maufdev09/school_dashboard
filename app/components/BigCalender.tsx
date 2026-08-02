"use client";

import moment from "moment";
import { getCalendarEvents } from "../lib/data";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalender = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [events] = useState(() => getCalendarEvents());

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div className="w-full h-[500px] sm:h-[600px] lg:h-[85vh] overflow-hidden rounded-xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.WORK_WEEK, Views.DAY]}
        view={view}
        onView={handleOnChangeView}
        defaultDate={new Date()}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default BigCalender;
