"use client";
import Image from "next/image";
import SignOutButton from "../Buttons/SignOutButton";
import { useState } from "react";
import { Settings, ShieldUser } from "lucide-react";
import Link from "next/link";
// Include Profile Avatar with navigation to profile page and signing out button
export const Profile = () => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`items-center gap-3 cursor-pointer rounded-md px-3 py-2`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/avatars/avatar.png"
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full h-full object-cover"
        />
        <span className="font-semibold">Admin</span>
      </div>
      {active && (
        <>
          <div className="flex gap-4 px-4 py-3 flex-col absolute bg-white mt-2 rounded-md border-1 ">
            {/* Triangle on top of the box */}
            <div className="absolute h-4.5 w-4.5 -translate-x-4 -translate-y-2.5 rotate-45 bg-white right-0.5 top-0 border-t-1 border-l-1" />
            {/* Triangle on top of the box */}
            <div className="flex gap-1 relative top-1 hover:font-extrabold">
              <ShieldUser size={"16px"} />
              <button
                className=" cursor-pointer text-gray-900"
                onClick={() => {}}
              >
                Profile
              </button>
            </div>
            <div className="relative">
              <Link
                href="/settings"
                className="flex gap-1 text-gray-900 hover:font-extrabold"
              >
                <Settings className="cursor-pointer  " size={16} />
                Settings
              </Link>
            </div>
            <div className="relative">
              <SignOutButton />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
