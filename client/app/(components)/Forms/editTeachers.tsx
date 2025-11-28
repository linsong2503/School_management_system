/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "./modal";
import React, { useState, useEffect } from "react";
import { useGetSubjectsQuery, useGetTeacherByIdQuery } from "@/state/api";
import { useUpdateTeacherMutation } from "@/state/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Loading";
import DropDownBox from "../DropdownBox";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const EditTeacherBox = ({ isOpen, onClose, id }: Props) => {
  const router = useRouter();
  const { data:singleTeacherData } = useGetTeacherByIdQuery(id || "");
  const { data:subjectData } = useGetSubjectsQuery();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [updatedAt] = useState(new Date(Date.now()));
  const [updateTeacher, { error, isSuccess, isLoading }] =
    useUpdateTeacherMutation();

  useEffect(() => {
    const fetchData = () => {
      setUsername(singleTeacherData.username);
      setName(singleTeacherData.name);
      setSurname(singleTeacherData.surname);
      setEmail(singleTeacherData.email);
      setPhone(singleTeacherData.phone);
      setAddress(singleTeacherData.address);
      setSubjects(singleTeacherData.subjects);
    };
    if (singleTeacherData) {
      // If errors occur , remove properties such as username: SetStateAction<string>;
      // and so on in api.ts file
      fetchData();
    }
    if (error){
      toast.error("Something went wrong")
    };

    if (isSuccess) {
      toast.success("Successfully updated teacher information");
      // window.location.reload();
      router.refresh();
    }
  }, [error, isSuccess, singleTeacherData, router]);

  const handleSubmit = async () => {
    await updateTeacher({
      teacherId: id,
      username: username,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      subjects: subjects,
      updatedAt: updatedAt,
    });
  };

  const handleChange = (SubData: any) => {
    setSubjects(SubData);
  };

  const isFormValid = () => {
    return username && name && surname && email && phone && address;
  };

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm "; // customize input field

  const selectStyles =
    "mb-2 block w-full rounded border border-gray-300 px-3 py-2 ";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Teacher">
      <form
        className="mt-3 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Authentication Information */}
        <div>
          <span className="text-xl text-gray-700 font-medium">
            Authentication Information
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 mt-3">
            <input
              type="text"
              className={inputStyles}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className={inputStyles}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* Personal information */}
        <div className="space-y-3">
          <span className="text-xl text-gray-700 font-medium">
            Personal Information
          </span>
          {/*  */}
          <div className="space-y-2">
            <input
              type="text"
              className={inputStyles}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={inputStyles}
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />

            <input
              type="number"
              className={inputStyles}
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="address"
              className={inputStyles}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* Subjects */}
            <div className={selectStyles}>
              <DropDownBox
                options={subjectData}
                index={1}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

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

export default EditTeacherBox;
