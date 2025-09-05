import { useCreateParentMutation } from "@/state/api";
import React, { useState } from "react";
import Modal from "./modal";
import LoadingSpinner from "../Loading";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewParent = ({ isOpen, onClose }: Props) => {
  const [createParents, { isLoading }] = useCreateParentMutation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const clearForm = () => {
    setUsername("");
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  const handleSubmit = async () => {
    if (!name || !surname || !email || !phone || !address ) return;
    await createParents({
      username,
      name,
      surname,
      email,
      phone,
      address,
      st:"A",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    clearForm();
  };
  const isFormValid = () => {
    return username && name && surname && email && phone && address;
  };

  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Parent">
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

export default ModalNewParent;
