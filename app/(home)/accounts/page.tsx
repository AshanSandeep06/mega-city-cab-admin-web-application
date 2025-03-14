import React from "react";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";

const Accounts = async() => {
  return (
    <>
      <h1 className="text-[24px] dark:text-gray-100 font-semibold text-gray-800">Update your account</h1>

      <div className="flex flex-col gap-4 ">
        <h3 className="text-[20px] font-medium text-gray-800 dark:text-gray-200">Update user data</h3>
        <UpdateUserDataForm />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-[20px] font-medium text-gray-800 dark:text-gray-200">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
};

export default Accounts;
