/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BigCalendar from "@/app/(components)/Calendars/BigCalendar";
import Announcements from "@/app/(components)/Users/Announcements";
import Link from "next/link";
import PerformanceChart from "@/app/(components)/Charts/PerformanceChart";
import { useGetTeacherByIdQuery } from "@/state/api";
import { Droplet, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import BigCalendarContainer from "@/app/(components)/Calendars/BigCalendarContainer";

const GetSingleTeacher = (id: string) => {
  return useGetTeacherByIdQuery(id || "");
};

const SingleTeacherPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: singleTeacher, isError } = GetSingleTeacher(id);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState<any>();
  const [bloodType, setBloodType] = useState("");
  const [subjects, setSubjects] = useState("");
  const [lessons, setLessons] = useState("");
  const [classes, setClasses] = useState("");
  useEffect(() => {
    const fetchData = () => {
      setName(singleTeacher.name);
      setSurname(singleTeacher.surname);
      setEmail(singleTeacher.email);
      setPhone(singleTeacher.phone);
      setBloodType(singleTeacher.bloodType);
      setSubjects(singleTeacher._count.subjects);
      setLessons(singleTeacher._count.lessons);
      setClasses(singleTeacher._count.classes);
    };
    if (singleTeacher) {
      fetchData();
    }
    if (isError) {
      toast.error("Something went wrong! Please try again");
    }
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row ">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex flex-1 gap-2">
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
              <span className="text-xl font-medium gap-2">
                {name + " " + surname}
              </span>
              <div className="flex items-center gap-2">
                <Droplet size={"16px"} />
                <span className="font-semibold">{bloodType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="font-semibold">{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="font-semibold">{phone}</span>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex flex-1 gap-4 flex-wrap">
            <div className=" flex gap-4 items-center bg-white w-full md:w-[48%] xl:w-[45%] 2xl:w-[45%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleAttendance.png"}
                alt=""
                width={25}
                height={25}
              />
              <div>
                <h1 className="font-semibold text-xl">100%</h1>
                <span className="text-sm">Attendance</span>
              </div>
            </div>
            <div className=" gap-4 flex items-center bg-white w-full md:w-[48%] xl:w-[45%] 2xl:w-[45%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleBranch.png"}
                alt=""
                width={25}
                height={25}
              />
              <div>
                <h1 className="font-semibold text-xl">{subjects}</h1>
                <span className="text-sm">Branches</span>
              </div>
            </div>
            <div className=" gap-4 flex items-center bg-white w-full md:w-[48%] xl:w-[45%] 2xl:w-[45%] py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleClass.png"}
                alt=""
                width={25}
                height={25}
              />
              <div>
                <h1 className="font-semibold text-xl">{classes}</h1>
                <span className="text-sm">Classes</span>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-white w-full md:w-[48%] xl:w-[45%] 2xl:w-[45%]  py-2 px-3 rounded-md">
              <Image
                src={"/the_others/singleLesson.png"}
                alt=""
                width={25}
                height={25}
              />
              <div>
                <h1 className="font-semibold text-xl">{lessons}</h1>
                <span className="text-sm">Lessons</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[730px] w-[96.7%]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer id={id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs ">
            <Link className="p-3 rounded-md bg-blue-200" href="/">
              Teacher&apos;s Classes
            </Link>
            <Link className="p-3 rounded-md bg-pink-300" href="/">
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 rounded-md bg-green-200" href="/">
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-amber-200" href="/">
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-fuchsia-200" href="/">
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
