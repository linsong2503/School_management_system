import { useCreateTeacherMutation, Subjects, User_Sex } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import Modal from "./modal";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTeacher = ({ isOpen, onClose }: Props) => {
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sex, setGender] = useState<User_Sex>(User_Sex.MALE);
  const [subjects, setSubjects] = useState<Subjects>(Subjects.na);
  const [lessons, setLesson] = useState("");
  const [classes, setClass] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = async () => {
    const formattedBirthDay = formatISO(new Date(Birthday), {
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
      sex,
      subjects,
      lessons,
      classes,
    });
  };
  const isFormValid = () => {
    return username;
  };
  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 ";

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new teacher">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        
      </form>
    </Modal>
  );
};

export default ModalNewTeacher;
