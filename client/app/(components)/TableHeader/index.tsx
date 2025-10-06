import React, { useState } from "react";
import ModalNewParent from "../Forms/modalNewParent";
import Header from "../Header";
import { PlusSquare } from "lucide-react";
import ModalNewTeacher from "../Forms/modalNewTeacher";
type Props = {
  index: number;
};
const TableHeader = ({ index }: Props) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  switch (index) {
    case 1:
      return (
        <div className="px-4 xl:px-6">
          <ModalNewTeacher
            isOpen={isModelOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <div className="pb-6 pt-3 lg:pb-4 lg:pt-4">
            <Header
              name="Teachers"
              buttonComponent={
                <button
                  className="flex items-center rounded-md bg-blue-700 px-3 py-2 text-white hover:bg-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PlusSquare className="mr-2 h-5 w-5" /> New Teacher
                </button>
              }
            />
          </div>
        </div>
      );
    case 2:
      break;
    case 3:
      return (
        <div className="px-4 xl:px-6">
          <ModalNewParent
            isOpen={isModelOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <div className="pb-6 pt-3 lg:pb-4 lg:pt-4">
            <Header
              name="Parents"
              buttonComponent={
                <button
                  className="flex items-center rounded-md bg-blue-700 px-3 py-2 text-white hover:bg-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PlusSquare className="mr-2 h-5 w-5" /> New Parent
                </button>
              }
            />
          </div>
        </div>
      );
    default:
      break;
  }
};

export default TableHeader;
