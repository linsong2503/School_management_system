/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const MuitiSelectDropdown = ({ options,onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [active, setActive] = useState(false);
  const selectRef = useRef(null);

  const setOptions = (value: any) => {
    if (selectedOptions.includes(value)) {
      const opts = selectedOptions.filter((item: any) => item !== value);
      setSelectedOptions([...opts]);
      onChange([...opts]);
    } else {
      setSelectedOptions([...selectedOptions, value]);
      onChange([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const match = options.filter((item: { value: string }) =>
      item?.value.toLowerCase().includes(searchText.toLowerCase())
    );
    if (match) {
      setFilterOptions(match);
    } else {
      setFilterOptions(options);
    }
  }, [searchText]);

  useEffect(() => {
    const closeHadler = (event: any) => {
      if (
        selectRef.current &&
        !event.composedPath().includes(selectRef.current)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("click", closeHadler);
    return () => {
      document.removeEventListener("click", closeHadler);
    };
  }, [selectRef.current]);

  return (
    <div className="border border-gray-200 rounded-md" ref={selectRef}>
      <div className="px-2">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {selectedOptions.map((opt: any) => {
            return (
              <span
                key={opt}
                className=" border border-blue-100 px-1 bg-blue-300 rounded-md mt-1 flex items-center gap-1"
              >
                {opt}
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
          onKeyUp={(e) => setSearchText(e.target.value)}
          onClick={() => setActive(true)}
        />
      </div>
      {active && (
        <div className="flex flex-col gap-2 border-t-2 py-4 max-h-[300px] overflow-y-auto border-gray-400">
          {filterOptions.map(
            (option: {
              value: React.Key | null | undefined;
              label:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => {
              return (
                <div
                  className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  key={option.value}
                  onClick={() => setOptions(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.value)}
                  />
                  {option.label}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default MuitiSelectDropdown;
