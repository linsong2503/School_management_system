import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="text-center bg-white pt-4 w-200">
        <h2 className="text-orange-400 text-6xl font-bold my-2">404</h2>
        <p className="text-xl">Oops! An Error Occured While Processing Your Request</p>
        <button
          className="p-4 bg-orange-400 m-5 text-white font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          <h3>Go Back to Home</h3>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
