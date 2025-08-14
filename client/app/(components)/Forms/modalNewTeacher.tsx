import { useCreateTeacherMutation } from "@/state/api";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTeacher = ({ isOpen, onClose }: Props) => {
    const [createTeacher,{isLoading}] = useCreateTeacherMutation();
    const [createUsername,setUsername] = useState("");
    const [createName,setName] = useState("");
    const [createSurname,setSurname] = useState("");
    const [createEmail,setEmail] = useState("");
    const [createPhone,setPhone] = useState("");
    const [createAddress,setAddress] = useState("");
    const [createImg,setImg] = useState("");
    const [createBloodType,setBloodType] = useState("");
    const [createGender,setGender] = useState("");
    const [createSubject,setSubjects] = useState("");
    const [createLesson,setLesson] = useState("");
    const [createClass,setClass] = useState("");
    const [createBirthday,setBirthday] = useState("");
    return <div></div>
};

export default ModalNewTeacher;
