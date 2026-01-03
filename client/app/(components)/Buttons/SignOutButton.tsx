"use client";
import React from "react";
import { LogOut } from "lucide-react";
const SignOutButton = () => {
  return (
    <button
      className="flex gap-1 items-center font-medium cursor-pointer hover:font-extrabold text-gray-900"
      // onClick={() => signOut({ redirectUrl: "/" })}
    >
      <LogOut size={"16px"} />
      Sign out
    </button>
  );
};

export default SignOutButton;
