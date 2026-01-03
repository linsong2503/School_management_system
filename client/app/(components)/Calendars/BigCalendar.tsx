"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, SetView] = useState<View>(Views.WORK_WEEK);
  const handleOnChange = (selectedView: View) => {
    SetView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "98%", width: "100%" }}
      views={["work_week", "day"]}
      view={view}
      onView={handleOnChange}
      min={new Date(2025, 5, 4, 8, 0, 0)}
      max={new Date(2025, 5, 4, 15, 0, 0)}
    />
  );
};
export default BigCalendar;
