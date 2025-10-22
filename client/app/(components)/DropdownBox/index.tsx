/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

type DropProps = {
  options: any;
  index: number;
  onChange:any;
};

const DropDownBox = ({ options, index,onChange }: DropProps) => {
  let TextObj = "";
  switch (index) {
    case 1:
      TextObj = "Subjects";
      break;
    case 2:
      TextObj = "Classes";
      break;
    default:
      break;
  }
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [active, setActive] = useState(false);
  const selectRef = useRef(null);

  const setOptions = (value: any) => {
    if (selectedOptions.includes(value)) {
      const opts = selectedOptions.filter((item: any) => item != value);
      setSelectedOptions([...opts]);
      onChange([...opts]);
    } else {
      setSelectedOptions([...selectedOptions, value]);
      onChange([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const match = options?.filter((item: any) =>
      item?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (match) {
      setFilterOptions(match);
    } else {
      setFilterOptions(options);
    }
  }, [options, searchText]);

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
    <div className="flex flex-col gap-2">
      <div className="border border-gray-200 rounded-md" ref={selectRef}>
        <div className="px-2">
          {selectedOptions && selectedOptions.length > 0 && (
            <div className="flex items-center gap-2 text-xs flex-wrap">
              {selectedOptions.map((opt: any) => {
                return (
                  <span
                    key={opt}
                    className="flex flex-wrap items-center gap-1 bg-blue-200 mt-1 p-1 rounded-md"
                  >
                    <span className="font-bold"> {opt}</span>
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
          )}
          <input
            type="text"
            placeholder={`Search ${TextObj} ...`}
            className="py-2 w-full outline-none"
            onKeyUp={(e) => setSearchText((e.target as HTMLInputElement).value)}
            onClick={() => setActive(true)}
          />
        </div>
        {active && (
          <div className="flex flex-col border-t-2 border-gray-400 max-h[200px] overflow-y-auto py-3 px-2">
            {filterOptions.map((option: any) => {
              return (
                <div
                  className="flex items-center gap-1"
                  key={option.name}
                  onClick={() => setOptions(option.name)}
                >
                  <input
                    readOnly
                    type="checkbox"
                    checked={selectedOptions.includes(option.name)}
                  />
                  {option.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownBox;
