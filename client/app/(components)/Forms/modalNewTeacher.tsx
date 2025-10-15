/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateTeacherMutation,
  useGetSubjectsQuery,
  User_Sex,
  Blood_Types,
  useGetClassesQuery,
} from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "./modal";
import LoadingSpinner from "../Loading";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import DropDownBox from "../DropdownBox";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SubjectDropDownBox = () => {
  const { data } = useGetSubjectsQuery();
  return <DropDownBox options={data} index={1} />;
};
const ClassDropDownBox = () => {
  const { data } = useGetClassesQuery();
  return <DropDownBox options={data} index={2} />;
};
const ModalNewTeacher = ({ isOpen, onClose }: Props) => {
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState();
  const [bloodType, setBloodType] = useState<Blood_Types>();
  const [gender, setGender] = useState<User_Sex>();
  const [subjects, setSubjects] = useState<any>();
  const [lessons, setLesson] = useState("");
  const [classes, setClass] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async () => {
    // Convert date input into ISO format
    const formattedBirthDay = formatISO(new Date(birthday), {
      representation: "complete",
    });

    await createTeacher({
      username,
      name,
      surname,
      email,
      phone,
      address,
      img,
      bloodType,
      birthday: formattedBirthDay,
      sex: gender,
      subjects: subjects,
      classes: classes,
      lessons: lessons,
      st: "A",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
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
      gender
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
        <input
          type="text"
          className={inputStyles}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          type="email"
          className={inputStyles}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <CldUploadWidget uploadPreset="school">
          {({ open }) => {
            return (
              <div
                className={inputStyles}
                onClick={() => open()}
              >
               <div className="flex items-center gap-2 justify-center cursor-pointer">
                 <Upload />
                <span>Upload an image</span>
               </div>
              </div>
            );
          }}
        </CldUploadWidget>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={gender}
            onChange={(e) =>
              setGender(User_Sex[e.target.value as keyof typeof User_Sex])
            }
          >
            <option value="">Select Gender</option>
            <option value={User_Sex.MALE}>Male</option>
            <option value={User_Sex.FEMALE}>Female</option>
          </select>
          <select
            className={selectStyles}
            value={bloodType}
            onChange={(e) =>
              setBloodType(
                Blood_Types[e.target.value as keyof typeof Blood_Types]
              )
            }
          >
            <option value="">Blood Type</option>
            <option value={Blood_Types.a_p}>A+</option>
            <option value={Blood_Types.b_p}>B+</option>
            <option value={Blood_Types.ab_p}>AB+</option>
            <option value={Blood_Types.o_p}>O+</option>
            <option value={Blood_Types.a_m}>A-</option>
            <option value={Blood_Types.b_m}>B-</option>
            <option value={Blood_Types.ab_m}>AB-</option>
            <option value={Blood_Types.o_m}>O-</option>
          </select>
        </div>
        <input
          type="date"
          className={inputStyles}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        {/* Subjects and Lessons Selection  */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          {/* Subjects */}
          <div className={selectStyles}>
            <SubjectDropDownBox />
          </div>

          {/* Lessons */}
          <div className={selectStyles}>
            <input
              type="text"
              className={inputStyles}
              placeholder="Lessons"
              value={lessons}
              onChange={(e) => setLesson(e.target.value)}
            />
          </div>
        </div>
        {/* Classes */}
        <div className={selectStyles}>
          <ClassDropDownBox />
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
