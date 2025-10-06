/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState} from "react";
import MuitiSelectDropdown from "@/app/(components)/DropdownBox";
import { Events } from "@/state/api";
const Eventspage = () => {
  const events = [
    { value: Events.bg, label: "Blue and Gold Day" },
    { value: Events.pe, label: "Pie-a-Teacher Event" },
    { value: Events.pd, label: "Prize Drawings" },
    { value: Events.sw, label: "Spirit weeks" },
  ];
  const [formData, setFormData] = useState({ eventlist: [] });

  const handleChange = (data:any) =>{
     setFormData({...formData,eventlist:data})
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center h-full">
      <form className="bg-white p-5 rounded-sm w-[400px] m-auto mt-[100px] "
        onSubmit={(e)=>
        {
          e.preventDefault()
          console.log(formData)
        }
        }
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Events</label>
          <MuitiSelectDropdown options={events} onChange={handleChange} />
        </div>
        <button className="w-full bg-black text-white my-3 px-4 py-2 rounded-md cursor-pointer">Submit</button>
      </form>
    </div>
  );
};

export default Eventspage;
