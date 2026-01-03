/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateTeacherMutation, useGetSubjectsQuery } from "@/state/api";
import { bloodTypes, genders } from "@/lib/data";
import React, { useState } from "react";
import Modal from "./modal";
import LoadingSpinner from "../Loading";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import DropDownBox from "../DropdownBox";
import { toast } from "sonner";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTeacher = ({ isOpen, onClose }: Props) => {
  const { data } = useGetSubjectsQuery();
  const [createTeacher, { isLoading, isSuccess, isError }] =
    useCreateTeacherMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState<any>();
  const [bloodType, setBloodType] = useState("A+");
  const [gender, setGender] = useState("Male");
  const [subject, setSubjects] = useState<any>([]);
  const [birthday, setBirthday] = useState("");

  // Clear form inputs after submitting
  function clearForm() {
    setUsername("");
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setAddress("");
    setBirthday("");
    setGender("");
    setImg("");
    setSubjects([]);
    setBloodType("");
  }

  const handleSubmit = async () => {
    await createTeacher({
      username,
      name,
      surname,
      email,
      phone,
      address,
      img: img,
      birthday: birthday,
      sex: gender,
      bloodType,
      subjects: subject,
      st: "A",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    if (isSuccess) {
      clearForm();
      toast.success("Successfully created teacher information");
    }
    if (isError) {
      toast.error(
        "Errors occur when creating teacher's information. Please check your input again !"
      );
    }
  };

  const handleChange = (SubData: any) => {
    setSubjects(SubData);
  };

  const isFormValid = () => {
    return (
      username &&
      name &&
      surname &&
      email &&
      phone &&
      address &&
      bloodType &&
      birthday &&
      gender &&
      subject
    );
  };
  const selectStyles =
    "mb-2 block w-full rounded border border-gray-300 px-3 py-2 ";

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new teacher">
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

            {/* Cloudinary Image Uploading Widget */}
            <CldUploadWidget
              uploadPreset="school"
              onSuccess={(result, { widget }) => {
                setImg(result.info);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <div className={inputStyles} onClick={() => open()}>
                    <div className="flex items-center gap-2 justify-center cursor-pointer">
                      <Upload />
                      <span>Upload Teacher&apos;s Image</span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">
              <select
                className={selectStyles}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                {genders.map((gender) => (
                  <option value={gender.value} key={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
              <select
                className={selectStyles}
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              >
                <option value="">Blood Type</option>
                {bloodTypes.map((b_type) => (
                  <option value={b_type.value} key={b_type.value}>
                    {b_type.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="date"
              className={inputStyles}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            {/* Subjects */}
            <div className={selectStyles}>
              <DropDownBox options={data} index={1} onChange={handleChange} />
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

export default ModalNewTeacher;
