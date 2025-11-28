/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "./modal";
import ParentForm from "../MultiStepForm/parentForm";
import StudentForm from "../MultiStepForm/studentForm";
import { useMultistepForm } from "../MultiStepForm/useMultistepForm";
import { useCreateStudentMutation } from "@/state/api";
import { StepForward, StepBack } from "lucide-react";
import LoadingSpinner from "../Loading";
import { toast } from "sonner";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  // Student data
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  img: any;
  bloodType: string;
  birthday: string;
  gender: string;
  class_name: string;
  gradeId: string;
  createdAt: Date;
  updatedAt: Date;
  st: string;

  // Parents data
  p_username: string;
  p_name: string;
  p_surname: string;
  p_email: string;
  parentPhone: string;
  p_address: string;
};

const INITIAL_DATA: FormData = {
  username: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  img: "",
  bloodType: "A+",
  gender: "Male",
  class_name: "1A",
  birthday: "",
  gradeId: "1",
  st: "A",
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  p_username: "",
  p_name: "",
  p_surname: "",
  p_email: "",
  parentPhone: "",
  p_address: "",
};

const ModalNewStudent = ({ isOpen, onClose }: Props) => {
  const [createStudent, { isLoading, isSuccess, isError }] =
    useCreateStudentMutation();
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, next, back } = useMultistepForm([
    <StudentForm {...data} updateFields={updateFields} />,
    <ParentForm {...data} updateFields={updateFields} />,
  ]);

  function clearForm() {
    setData(INITIAL_DATA);
  }

  const isFormValid = () => {
    return (
      data.name &&
      data.surname &&
      data.email &&
      data.phone &&
      data.address &&
      data.bloodType &&
      data.birthday &&
      data.gender &&
      data.class_name &&
      data.gradeId &&
      data.p_username &&
      data.p_name &&
      data.p_surname &&
      data.p_email &&
      data.parentPhone &&
      data.p_address
    );
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created student's information");
      clearForm();
    }
    if (isError) {
      toast.error(
        "Errors occur while creating student's information! Please check your input again! " 
      );
    }
  }, [isError, isSuccess]);
  const handleSubmit = async () => {
    await createStudent({
      username: data.email,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      img: data.img,
      bloodType: data.bloodType,
      birthday: data.birthday,
      sex: data.gender,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      class_name: data.class_name,
      gradeId: parseInt(data.gradeId),
      p_username: data.p_username,
      p_name: data.p_name,
      p_surname: data.p_surname,
      p_email: data.p_email,
      parentPhone: data.parentPhone,
      p_address: data.p_address,
      st: data.st,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Student">
      <form
        className="mt-1 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Content */}
        <div className="">{step}</div>

        {/* Buttons */}
        <div className="flex justify-end mt-2 gap-1">
          {/* Backward Button */}
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="bg-blue-500 rounded-3xl p-1 cursor-pointer hover:bg-blue-400 text-white"
            >
              <StepBack />
            </button>
          )}
          {/* Forward Button */}
          {!isLastStep && (
            <button
              type="button"
              onClick={next}
              className="bg-blue-500 rounded-3xl p-1 cursor-pointer hover:bg-blue-400 text-white "
            >
              <StepForward />
            </button>
          )}
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

export default ModalNewStudent;
