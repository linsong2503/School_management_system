/* eslint-disable @typescript-eslint/no-explicit-any */
import { adjustToCurrentWeek } from "@/lib/utils";
import { useGetLessonsByIdQuery } from "@/state/api";
import React from "react";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = ({ id }: { id: string }) => {
  const { data: LessonData } = useGetLessonsByIdQuery(id);
  const data = LessonData.map((lesson: any) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustToCurrentWeek(data);
  return (
    <div>
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
