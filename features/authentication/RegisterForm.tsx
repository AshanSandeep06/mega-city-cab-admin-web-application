// "use client";
// import React from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
//
// import FormRow from "@/components/FormRow";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
// import {SpinnerMini} from "@/components/Loader";
// import { useRegister } from "./hooks/useRegister";
//
// const RegisterForm = () => {
//   const { isRegistering, register } = useRegister();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     getValues,
//     reset,
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       passwordConfirm: "",
//     },
//   });
//
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     const { email, password, fullName } = data;
//     registerUser({ email, password, fullName }, {
//       onSuccess: () => reset()
//     });
//   };
//
//   return (
//     <form
//       className="text-[14px] py-[24px] px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <FormRow
//         label="Full name"
//         error={errors?.fullName?.message}
//         id="fullName"
//       >
//         <Input
//           type="text"
//           id="fullName"
//           disabled={isLoading}
//           {...register("fullName", { required: "This field is required" })}
//         />
//       </FormRow>
//
//       <FormRow label="Email address" error={errors?.email?.message} id="email">
//         <Input
//           type="email"
//           id="email"
//           disabled={isLoading}
//           {...register("email", {
//             required: "This field is required",
//             pattern: {
//               value: /\S+@\S+\.\S+/,
//               message: "Please provide a valid email address",
//             },
//           })}
//         />
//       </FormRow>
//
//       <FormRow
//         label="Password (min 8 characters)"
//         error={errors?.password?.message}
//         id="password"
//       >
//         <Input
//           type="password"
//           id="password"
//           disabled={isLoading}
//           {...register("password", {
//             required: "This field is required",
//             minLength: {
//               value: 8,
//               message: "Password needs a minimum of 8 characters",
//             },
//           })}
//         />
//       </FormRow>
//
//       <FormRow
//         label="Repeat password"
//         error={errors?.passwordConfirm?.message}
//         id="passwordConfirm"
//       >
//         <Input
//           type="password"
//           id="passwordConfirm"
//           disabled={isLoading}
//           {...register("passwordConfirm", {
//             required: "This field is required",
//             validate: (value) =>
//               value === getValues().password || "Passwords need to match",
//           })}
//         />
//       </FormRow>
//
//       <FormRow hasButton>
//         <Button
//           variant="secondary"
//           type="reset"
//           disabled={isLoading}
//           onClick={() => reset()}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isLoading} className="flex gap-2 items-center">
//           {isLoading && <SpinnerMini />}
//           Create new user
//         </Button>
//       </FormRow>
//     </form>
//   );
// };
//
// export default RegisterForm;


// --------------------------------------------------------------------------------------------------------


// features/auth/RegisterUserForm.tsx
"use client";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";
import { useRegister } from "./hooks/useRegister";
import { UserDto } from "@/types";
import {useCreateUser} from "@/features/authentication/hooks/useCreateUser";

interface RegisterUserFormProps {
  onCloseModal?: () => void;
}

const RegisterUserForm: React.FC<RegisterUserFormProps> = ({ onCloseModal }) => {
  const { isRegistering, register } = useCreateUser();

  const {
    register: formRegister,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      contactNumber: "",
      email: "",
      address: "",
      nic: "",
      status: "1", // Default status, adjust as needed
      role: "User", // Default role, adjust as needed (e.g., "Admin", "User")
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dto: UserDto = {
      username: data.username,
      password: data.password,
      contactNumber: data.contactNumber,
      email: data.email,
      address: data.address,
      nic: data.nic,
      status: data.status,
      role: data.role,
    };

    console.log("DTO data: ", dto)

    register(dto, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  const onError = (err: any) => {
    console.log("Form submission error:", err);
  };

  return (
      <form className="w-[800px] text-[14px]" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Username" error={errors?.username?.message} id="username">
          <Input
              type="text"
              id="username"
              disabled={isRegistering}
              {...formRegister("username", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Password" error={errors?.password?.message} id="password">
          <Input
              type="password"
              id="password"
              disabled={isRegistering}
              {...formRegister("password", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Contact Number" error={errors?.contactNumber?.message} id="contactNumber">
          <Input
              type="text"
              id="contactNumber"
              disabled={isRegistering}
              {...formRegister("contactNumber", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message} id="email">
          <Input
              type="email"
              id="email"
              disabled={isRegistering}
              {...formRegister("email", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Address" error={errors?.address?.message} id="address">
          <Input
              type="text"
              id="address"
              disabled={isRegistering}
              {...formRegister("address", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="NIC" error={errors?.nic?.message} id="nic">
          <Input
              type="text"
              id="nic"
              disabled={isRegistering}
              {...formRegister("nic", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message} id="status">
          <select
              id="status"
              disabled={isRegistering}
              {...formRegister("status", { required: "This field is required" })}
              className="w-full p-2 border rounded"
          >
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>
        </FormRow>

        <FormRow label="Role" error={errors?.role?.message} id="role">
          <select
              id="role"
              disabled={isRegistering}
              {...formRegister("role", { required: "This field is required" })}
              className="w-full p-2 border rounded"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </FormRow>

        <FormRow hasButton>
          <Button variant="secondary" type="reset" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isRegistering} type="submit" className="flex items-center gap-2">
            {isRegistering && <SpinnerMini />}
            <span>Register User</span>
          </Button>
        </FormRow>
      </form>
  );
};

export default RegisterUserForm;
