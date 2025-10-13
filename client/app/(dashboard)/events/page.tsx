/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useGetEventsQuery } from "@/state/api";
import { IoMdClose } from "react-icons/io";
const Eventspage = () => {
  const { data } = useGetEventsQuery();
  const [formData, setFormData] = useState({ eventlist: [] });
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [active, setActive] = useState(false);
  const selectRef = useRef(null);

  const handleChange = (data: any) => {
    setFormData({ ...formData, eventlist: data });
  };

  const setOptions = (value: any) => {
    if (selectedOptions.includes(value)) {
      const opts = selectedOptions.filter((item: any) => item != value);
      setSelectedOptions([...opts]);
      handleChange([...opts]);
    } else {
      setSelectedOptions([...selectedOptions, value]);
      handleChange([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const match = data?.filter((item) =>
      item?.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (match) {
      setFilterOptions(match);
    }
    else{
      setFilterOptions(data)
    }
  }, [data, searchText]);

  useEffect(() => {
    const closeHandler = (event: any) => {
      if (
        selectRef.current &&
        !event.composedPath().includes(selectRef.current)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("click", closeHandler);
    return () => {
      document.removeEventListener("click", closeHandler);
    };
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-full">
      <form
        className="bg-white p-5 rounded-sm w-[400px] m-auto mt-[100px] "
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
        }}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">{searchText}</label>
          <div className="border border-gray-200 rounded-md">
            <div className="px-2">
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {selectedOptions.map((opt: any) => {
                  return (
                    <span key={opt} className="">
                      
                      <span
                        className="cursor-pointer"
                        onClick={() => setOptions(opt)}
                      >
                        <IoMdClose />
                      </span>
                    </span>
                  );
                })}
              </div>
              <input
                type="text"
                placeholder="Search Events"
                className="py-2 px-4 w-full outline-none"
                onKeyUp={(e) =>
                  setSearchText(e.target.value)
                }
                onClick={() => setActive(true)}
              />
            </div>
            {active && (
              <div className="">
                {filterOptions.map((option: any) => {
                  return (
                    <div
                      className="border-t-gray-200"
                      key={option.title}
                      onClick={() => setOptions(option.title)}
                    >
                      <input
                      readOnly
                        type="checkbox"
                        checked={selectedOptions.includes(option.title)}
                      />
                      {option.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <button className="w-full bg-black text-white my-3 px-4 py-2 rounded-md cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Eventspage;
