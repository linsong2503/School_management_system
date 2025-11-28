/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "./modal";
import {
  useGetClassesQuery,
  useGetGradesQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "@/state/api";
import LoadingSpinner from "../Loading";
import { toast } from "sonner";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const EditStudentBox = ({ isOpen, onClose, id }: Props) => {
  const { data: singleStudentData } = useGetStudentByIdQuery(id || "");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [p_phone, setP_phone] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [class_name, setClass_name] = useState("");
  const [updatedAt] = useState(new Date(Date.now()));
  const [updateStudent, { isLoading, isSuccess, isError }] =
    useUpdateStudentMutation();
  const { data: classData } = useGetClassesQuery();
  const { data: gradeData } = useGetGradesQuery();
  const [selectedClasses, setSelectedClasses] = useState<any>([]);
  useEffect(() => {
    const fetchData = () => {
      setEmail(singleStudentData.email);
      setName(singleStudentData.name);
      setSurname(singleStudentData.surname);
      setPhone(singleStudentData.phone);
      setAddress(singleStudentData.address);
      setGradeId(singleStudentData.gradeId);
      setP_phone(singleStudentData.parent_phoneNum);
      setClass_name(singleStudentData.class_name);
    };
    if (singleStudentData) {
      fetchData();
    }
    if (isError) {
      toast.error("Something went wrong! ");
    }
    if (isSuccess) {
      toast.success("Successfully updated student's information");
    }
  }, [singleStudentData, isError, isSuccess]);
  useEffect(() => {
    // any classes have the same level with selected grade would be selected
    const match = classData?.filter((item) => item.name.includes(gradeId));
    return match ? setSelectedClasses(match) : setSelectedClasses(classData);
  }, [classData, gradeId]);
  const isFormValid = () => {
    return (
      name &&
      surname &&
      email &&
      phone &&
      address &&
      class_name &&
      gradeId &&
      p_phone &&
      1
    );
  };

  const handleSubmit = async () => {
    await updateStudent({
      studentId: id,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      updatedAt: updatedAt,
      class_name: class_name,
      gradeId: parseInt(gradeId),
      parentPhone: p_phone,
    });
  };

  const selectStyles =
    "mb-2 block w-full rounded border border-gray-300 px-3 py-2 ";

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Student">
      <form
        className="mt-1 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Content */}
        <div className="p-1">
          <span className="text-xl font-medium text-gray-700">
            Authentication Information
          </span>
          <input
            type="email"
            placeholder="Email"
            className={inputStyles}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-1">
          <span className="text-xl font-medium text-gray-700">
            Personal Information
          </span>
          <div className="space-y-2 mt-2">
            <input
              type="text"
              placeholder="Name"
              className={inputStyles}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Surname"
              className={inputStyles}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone"
              className={inputStyles}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className={inputStyles}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex justify-between">
              <span className=" font-medium text-gray-700">Grade</span>
              <span className=" font-medium text-gray-700">Class</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 mt-2">
              {/* Grades */}
              <select
                className={selectStyles}
                onChange={(e) => {
                  setGradeId(e.target.value);
                }}
                value={gradeId}
              >
                {gradeData?.map((g) => (
                  <option key={g.id}>{g.level}</option>
                ))}
              </select>
              {/* Classes */}
              <select
                className={selectStyles}
                onChange={(e) => {
                  setClass_name(e.target.value);
                }}
                value={class_name}
              >
                {selectedClasses?.map((c: any) => (
                  <option key={c.id}>{`${c.name}`}</option>
                ))}
              </select>
            </div>
             <span className=" font-medium text-gray-700">Parent&apos;s Phone Number</span>
             <input
              type="number"
              placeholder="Phone"
              className={inputStyles}
              value={p_phone}
              onChange={(e) => setP_phone(e.target.value)}
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md  border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? (
            <LoadingSpinner color="orange" size="small" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default EditStudentBox;
