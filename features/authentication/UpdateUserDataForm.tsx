// "use client";
// import React, { FC } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
// import type { Session } from "next-auth";
//
// import FormRow from "@/components/FormRow";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
// import {SpinnerMini} from "@/components/Loader";
//
// import { useUpdateUser } from "./hooks/useUpdateUser";
//
// const UpdateUserDataForm = () => {
//   // const { email = "", name = "", image = "" } = localStorage.getItem("");
//   const router = useRouter();
//
//   const name = "";
//   const email = "";
//
//   const { updateUser, isUpdating } = useUpdateUser();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name,
//       email,
//     },
//   });
//
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     const { image, name } = data;
//
//     updateUser(
//       {
//         name,
//         image: typeof image !== "string" ? image[0] : image,
//       },
//       {
//         onSuccess: async (data) => {
//           /*await update({
//             user: {
//               ...data,
//             },
//           });*/
//           router.refresh();
//         },
//       }
//     );
//   };
//
//   return (
//     <form
//       className="py-6 px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <FormRow label="Email address" id="email">
//         <Input id="email" disabled {...register("email")} />
//       </FormRow>
//
//       <FormRow label="Full name" id="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow hasButton className="mt-4">
//         <Button type="reset" disabled={isUpdating} variant="secondary" onClick={() => router.back()}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isUpdating} className="flex gap-2 ">
//           {isUpdating && <SpinnerMini />}
//           <span> Update account</span>
//         </Button>
//       </FormRow>
//     </form>
//   );
// };
//
// export default UpdateUserDataForm;

// ----------------------------------------------------------------------------------------------




// UpdateUserDataForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SpinnerMini } from "@/components/Loader";
import { fetchUserById, updateUser } from "@/services/apiAuth";
import { User } from "@/types";
import {toast} from "react-hot-toast";

const UpdateUserDataForm = () => {
    const router = useRouter();

    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data on mount
    useEffect(() => {
        const loadUserData = async () => {
            if (!localStorage.getItem("userId")) {
                setError("User not authenticated");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const user = await fetchUserById(Number(localStorage.getItem("userId")));
                setUserData(user);
            } catch (err) {
                setError("Failed to load user data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<User>({
        defaultValues: {
            userId: 0,
            username: "",
            password: "", // Not editable in this form
            contactNumber: "",
            email: "",
            address: "",
            nic: "",
            status: "",
            role: "",
        },
    });

    // Update form default values when userData changes
    useEffect(() => {
        if (userData) {
            reset({
                userId: userData.userId,
                username: userData.username,
                contactNumber: userData.contactNumber,
                email: userData.email,
                address: userData.address,
                nic: userData.nic,
                status: userData.status,
                role: userData.role,
            });
        }
    }, [userData, reset]);

    const onSubmit: SubmitHandler<User> = async (data) => {
        if (!localStorage.getItem("userId")) {
            setError("User not authenticated");
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const updatedUserData: User = {
                id: Number(localStorage.getItem("userId")),
                username: data.username,
                password: userData?.password || "", // Password should not change here
                contactNumber: data.contactNumber,
                email: data.email,
                address: data.address,
                nic: data.nic,
                status: userData?.status || "ACTIVE", // Assuming status shouldn't change
                role: userData?.role || "USER", // Assuming role shouldn't change
            };

            const updatedUser = await updateUser(updatedUserData); // Call the API to update user data
            toast.success("User successfully updated");
            router.refresh(); // Refresh the page to reflect changes
        } catch (err) {
            setError("Failed to update user data. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading user data...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Display Current User Data */}
            {/*<div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-md border border-gray-200 dark:border-gray-700">*/}
            {/*    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">*/}
            {/*        Current User Information*/}
            {/*    </h4>*/}
            {/*    <div className="space-y-2">*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Username:</span> {userData?.username || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Email:</span> {userData?.email || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Contact Number:</span>{" "}*/}
            {/*            {userData?.contactNumber || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Address:</span> {userData?.address || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">NIC:</span> {userData?.nic || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Status:</span> {userData?.status || "N/A"}*/}
            {/*        </p>*/}
            {/*        <p className="text-gray-700 dark:text-gray-300">*/}
            {/*            <span className="font-medium">Role:</span> {userData?.role || "N/A"}*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Update Form */}
            <form
                className="py-6 px-10 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md text-[14px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormRow label="Username" id="username" error={errors?.username?.message}>
                    <Input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "This field is required",
                        })}
                    />
                </FormRow>

                <FormRow label="Email address" id="email" error={errors?.email?.message}>
                    <Input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address",
                            },
                        })}
                    />
                </FormRow>

                <FormRow
                    label="Contact Number"
                    id="contactNumber"
                    error={errors?.contactNumber?.message}
                >
                    <Input
                        type="text"
                        id="contactNumber"
                        {...register("contactNumber", {
                            required: "This field is required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Please provide a valid 10-digit contact number",
                            },
                        })}
                    />
                </FormRow>

                <FormRow label="Address" id="address" error={errors?.address?.message}>
                    <Input
                        type="text"
                        id="address"
                        {...register("address", {
                            required: "This field is required",
                        })}
                    />
                </FormRow>

                <FormRow label="NIC" id="nic" error={errors?.nic?.message}>
                    <Input
                        type="text"
                        id="nic"
                        {...register("nic", {
                            required: "This field is required",
                        })}
                    />
                </FormRow>

                <FormRow label="Status" error={errors?.status?.message} id="status">
                    <select
                        id="status"
                        disabled
                        {...register("status")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </FormRow>

                <FormRow label="Role" error={errors?.role?.message} id="role">
                    <select
                        id="role"
                        disabled
                        value={localStorage.getItem("role")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </FormRow>

                <FormRow hasButton className="mt-4">
                    <Button
                        type="reset"
                        disabled={isUpdating}
                        variant="secondary"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating} className="flex gap-2">
                        {isUpdating && <SpinnerMini />}
                        <span>Update account</span>
                    </Button>
                </FormRow>
            </form>
        </div>
    );
};

export default UpdateUserDataForm;


