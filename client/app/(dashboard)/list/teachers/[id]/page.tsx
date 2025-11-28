/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BigCalendar from "@/app/(components)/Calendars/BigCalendar";
import Announcements from "@/app/(components)/Users/Announcements";
import Link from "next/link";
import PerformanceChart from "@/app/(components)/Charts/PerformanceChart";
import { useGetTeacherByIdQuery } from "@/state/api";
import { Droplet, Mail, Phone } from "lucide-react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SingleTeacherPage = (params: any) => {
  const id = params.id;
  const { data: singleTeacherData } = useGetTeacherByIdQuery(id || "");
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD */}
          <div className="bg-blue-200 py-6 px-4 rounded-md flex flex-1 gap-2">
            <div className="w-1/3">
              <Image
                src={"/avatars/avatar.png"}
                alt="avatar"
                width={120}
                height={120}
                className="object-cover rounded-full w-30 h-30"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-3">
              <span className="text-xl font-medium">Name</span>
              <div className="flex items-center gap-2">
                <Droplet size={"16px"} />
                <span className="">Blood Type</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="">phone</span>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex flex-1 gap-3 flex-wrap justify-between">
            <div className=" flex gap-2 items-center bg-white w-[48%] xl:w-[49%] 2xl:w-[48%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleAttendance.png"}
                alt=""
                width={25}
                height={25}
              />
              <div className="font-bold ">
                <span >Attendance</span>
                <span className="px-3">100%</span>
              </div>
            </div>
            <div className=" gap-2 flex items-center bg-white w-[48%] xl:w-[49%] 2xl:w-[48%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleBranch.png"}
                alt=""
                width={25}
                height={25}
              />
              <div className="font-bold">
                <span >Branches</span>
                <span className="px-3">3</span>
              </div>
            </div>
            <div className=" gap-2 flex items-center bg-white w-[48%] xl:w-[49%] 2xl:w-[48%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleClass.png"}
                alt=""
                width={25}
                height={25}
              />
              <div className="font-bold">
                <span >Classes</span>
                <span className="px-3">6</span>
              </div>
            </div>
            <div className=" gap-2 flex items-center bg-white w-[48%] xl:w-[49%] 2xl:w-[48%]  py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleLesson.png"}
                alt=""
                width={25}
                height={25}
              />
              <div className="font-bold ">
                <span >Lessons</span>
                <span className="px-3">6</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className=""></div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
};

export default SingleTeacherPage;
