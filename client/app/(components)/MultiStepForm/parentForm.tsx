import React from "react";

type parentFormData = {
  p_username: string;
  p_name: string;
  p_surname: string;
  p_email: string;
  parentPhone: string;
  p_address: string;
};

type parentFormProps = parentFormData & {
  updateFields: (fields: Partial<parentFormData>) => void;
};

const ParentForm = ({
  p_username,
  p_name,
  p_surname,
  p_email,
  parentPhone,
  p_address,
  updateFields,
}: parentFormProps) => {
  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm ";

  return (
    <>
      <span className="font-semibold">Parents Information</span>
      <div className=" mt-2 space-y-2">
        <input
          type="text"
          className={inputStyles}
          placeholder="Username"
          value={p_username}
          onChange={(e) => updateFields({ p_username: e.target.value })}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Name"
          value={p_name}
          onChange={(e) => updateFields({ p_name: e.target.value })}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Surname"
          value={p_surname}
          onChange={(e) => updateFields({ p_surname: e.target.value })}
        />
        <input
          type="email"
          className={inputStyles}
          placeholder="Email"
          value={p_email}
          onChange={(e) => updateFields({ p_email: e.target.value })}
        />
        <input
          type="number"
          className={inputStyles}
          placeholder="Phone number"
          value={parentPhone}
          onChange={(e) => updateFields({ parentPhone: e.target.value })}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Address"
          value={p_address}
          onChange={(e) => updateFields({ p_address: e.target.value })}
        />
      </div>
    </>
  );
};

export default ParentForm;
