// "use client";
// import React from "react";
// import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
// import { signOut } from "next-auth/react";
//
// import Button from "@/components/Button";
// import FormRow from "@/components/FormRow";
// import Input from "@/components/Input";
// import {useUpdatePassword, useUpdateUser} from "./hooks/useUpdateUser";
// import {SpinnerMini} from "@/components/Loader";
// import { useMoveBack } from "@/hooks/useMoveBack";
//
// const UpdatePasswordForm = () => {
//   const { editUserPassword, isUpdating } = useUpdatePassword();
//   const onBack = useMoveBack();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     getValues,
//   } = useForm({
//     defaultValues: {
//       password: "",
//       passwordConfirm: "",
//     },
//   });
//
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     const { password } = data;
//     console.log(password)
//
//     editUserPassword(
//       {
//         password,
//       },
//       {
//         onSuccess: () => {
//           reset();
//           signOut();
//         },
//       }
//     );
//   };
//
//   return (
//     <form
//       className="py-6 px-10 bg-white dark:bg-black  border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <FormRow
//         label="New password (min 8 chars)"
//         error={errors?.password?.message}
//       >
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
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
//         label="Confirm password"
//         error={errors?.passwordConfirm?.message}
//       >
//         <Input
//           type="password"
//           autoComplete="new-password"
//           id="passwordConfirm"
//           {...register("passwordConfirm", {
//             required: "This field is required",
//             validate: (value) =>
//               getValues().password === value || "Passwords need to match",
//           })}
//         />
//       </FormRow>
//       <FormRow hasButton className="mt-4">
//         <Button type="reset"  disabled={isUpdating}  variant="secondary" onClick={onBack}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isUpdating} className="flex gap-2 ">
//           {isUpdating && <SpinnerMini />}
//           <span>Update password</span>
//         </Button>
//       </FormRow>
//     </form>
//   );
// };
//
// export default UpdatePasswordForm;

// ---------------------------------------------------------------------------------------

// UpdatePasswordForm.tsx
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast"; // Ensure this is installed
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import { useUpdatePassword } from "./hooks/useUpdateUser";
import { SpinnerMini } from "@/components/Loader";
import { useMoveBack } from "@/hooks/useMoveBack";

interface UserPasswordDto {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const UpdatePasswordForm = () => {
  const { editUserPassword, isUpdating } = useUpdatePassword();
  const onBack = useMoveBack();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordFormData> = (data) => {
    if (!localStorage.getItem("userId")) {
      toast.error("User not authenticated");
      return;
    }

    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    const dto: UserPasswordDto = {
      userId,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    editUserPassword(dto, {
      onSuccess: () => {
        toast.success("Password successfully updated!"); // Override default toast if needed
        // reset();
        // signOut();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to update password");
      },
    });
  };

  return (
      <form
          className="py-6 px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
          onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow
            label="Current password"
            error={errors?.currentPassword?.message}
        >
          <Input
              type="password"
              id="currentPassword"
              autoComplete="current-password"
              {...register("currentPassword", {
                required: "This field is required",
              })}
          />
        </FormRow>

        <FormRow
            label="New password (min 8 chars)"
            error={errors?.newPassword?.message}
        >
          <Input
              type="password"
              id="newPassword"
              autoComplete="new-password"
              {...register("newPassword", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Password needs a minimum of 5 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                  message: "Password must contain at least one letter and one number",
                },
              })}
          />
        </FormRow>

        <FormRow
            label="Confirm new password"
            error={errors?.newPasswordConfirm?.message}
        >
          <Input
              type="password"
              id="newPasswordConfirm"
              autoComplete="new-password"
              {...register("newPasswordConfirm", {
                required: "This field is required",
                validate: (value) =>
                    getValues().newPassword === value || "Passwords need to match",
              })}
          />
        </FormRow>

        <FormRow hasButton className="mt-4">
          <Button
              type="reset"
              disabled={isUpdating}
              variant="secondary"
              onClick={onBack}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating} className="flex gap-2">
            {isUpdating && <SpinnerMini />}
            <span>Update password</span>
          </Button>
        </FormRow>
      </form>
  );
};

export default UpdatePasswordForm;
