import Modal from "./modal";
import React, { useState, useEffect } from "react";
import { useGetParentByIdQuery } from "@/state/api";
import { useUpdateParentMutation } from "@/state/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const EditBox = ({ isOpen, onClose, id }: Props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [updatedAt] = useState(new Date(Date.now()));
  const { data } = useGetParentByIdQuery(id || "");
  const [updateParent, { error, isSuccess }] = useUpdateParentMutation();
  useEffect(() => {
    if (data) {
      // If errors occur , remove properties such as username: SetStateAction<string>; 
      // and so on in api.ts file
      setUsername(data.username);
      setName(data.name);
      setSurname(data.surname);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
    }
    if (error) alert(error);

    if (isSuccess) {
      window.location.reload();
    }
  }, [error, isSuccess, data]);

  const handleSubmit = async () => {
    await updateParent({
      parentId: id,
      username: username,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      updatedAt: updatedAt,
    });
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
