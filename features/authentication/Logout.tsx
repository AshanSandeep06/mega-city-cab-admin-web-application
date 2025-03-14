"use client";
import React, { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import {SpinnerMini} from "@/components/Loader";
import {useRouter} from "next/navigation";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleLogout = () => {
    setIsLoading(true);

    // Clear localStorage
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    // Redirect to login page
    router.push("/login");
    // No need for router.refresh() here unless you want to force a re-render

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className="border-none p-[6px] rounded-md dark:hover:bg-gray-800 duration-200 hover:bg-gray-100 "
      disabled={isLoading}
      onClick={handleLogout}
    >
      {!isLoading ? (
        <HiArrowRightOnRectangle className="w-5 h-5 text-indigo-500" />
      ) : (
        <SpinnerMini className="dark:text-gray-400"/>
      )}
    </button>
  );
};

export default Logout;
