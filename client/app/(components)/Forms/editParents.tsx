/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "./modal";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const EditBox = ({ isOpen, onClose, id }: Props) => {
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const fetchData = async () => {
    const response = await axios.get(`${baseURL}` + `parents/${id}`);
    setUsername(response.data.username);
    setName(response.data.name);
    setSurname(response.data.surname);
    setEmail(response.data.email);
    setPhone(response.data.phone);
    setAddress(response.data.address);
  };
  const handleSubmit = async () => {
     await axios.put(`${baseURL}` + `parents/${id}`,{username,name,surname,email,phone,address});
     fetchData();
     window.location.reload();
  };
  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm "; // customize input field

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Parent">
      <form
        className="mt-4 space-y-6"
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
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md  border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer`}
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default EditBox;
