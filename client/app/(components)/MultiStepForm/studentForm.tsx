/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { bloodTypes, genders } from "@/lib/data";
import { useGetClassesQuery, useGetGradesQuery } from "@/state/api";
type studentFormData = {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  img: any;
  birthday: string;
  bloodType: string;
  gender: string;
  class_name: string;
  gradeId: string;
  createdAt: Date;
  updatedAt: Date;
};

type studentFormProps = studentFormData & {
  updateFields: (fields: Partial<studentFormData>) => void;
};

const StudentForm = ({
  name,
  surname,
  email,
  phone,
  address,
  birthday,
  bloodType,
  gender,
  class_name,
  gradeId,
  updateFields,
}: studentFormProps) => {
  const { data: classData } = useGetClassesQuery();
  const { data: gradeData } = useGetGradesQuery();
  const [selectedClasses, setSelectedClasses] = useState<any>([]);

  const selectStyles =
    "mb-2 block w-full rounded border border-gray-300 px-3 py-2 ";

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";

  // When users opt for grade id, the class select box would
  // display exactly the classes with selected level
  // Ex: When users opt for grade 4, they would see only classes 4A, 4B and 4C as well,
  // so they would not be confused because there are too many classes

  useEffect(() => {
    // any classes have the same level with selected grade would be selected
    const match = classData?.filter((item) => item.name.includes(gradeId));
    return match ? setSelectedClasses(match) : setSelectedClasses(classData);
  }, [classData, gradeId]);
  return (
    <>
      <div className="p-1">
        <span className="text-xl font-medium text-gray-700">
          Authentication Information
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 mt-2">
          <input
            type="text"
            placeholder="Username"
            className={inputStyles}
            value={email}
            onChange={(e) => updateFields({ username: e.target.value })}
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            className={inputStyles}
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </div>
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
            onChange={(e) => updateFields({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Surname"
            className={inputStyles}
            value={surname}
            onChange={(e) => updateFields({ surname: e.target.value })}
          />
          <input
            type="number"
            placeholder="Phone"
            className={inputStyles}
            value={phone}
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className={inputStyles}
            value={address}
            onChange={(e) => updateFields({ address: e.target.value })}
          />
          <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, { widget }) => {
              updateFields({ img: result.info });
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div className={inputStyles} onClick={() => open()}>
                  <div className="flex items-center gap-2 justify-center cursor-pointer">
                    <Upload />
                    <span>Upload Student&apos;s Image</span>
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>
          <input
            type="date"
            className={inputStyles}
            value={birthday}
            onChange={(e) => updateFields({ birthday: e.target.value })}
          />
          <div className="flex justify-between">
            <span className=" font-medium text-gray-700">Gender</span>
            <span className=" font-medium text-gray-700">Blood Type</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 mt-2">
            {/* gender */}
            <select
              className={selectStyles}
              value={gender}
              onChange={(e) => updateFields({ gender: e.target.value })}
            >
              {genders.map((g) => (
                <option key={g.value}>{g.label}</option>
              ))}
            </select>
            {/* bloodType */}
            <select
              className={selectStyles}
              value={bloodType}
              onChange={(e) => {
                updateFields({ bloodType: e.target.value });
              }}
            >
              {bloodTypes.map((b) => (
                <option key={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <span className=" font-medium text-gray-700">Grade</span>
            <span className=" font-medium text-gray-700">Class</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 mt-2">
            {/* Grades */}
            <select
              className={selectStyles}
              onChange={(e) => {
                updateFields({ gradeId: e.target.value });
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
                updateFields({ class_name: e.target.value });
              }}
              value={class_name}
            >
              {selectedClasses?.map((c: any) => (
                <option key={c.id}>{`${c.name}`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
