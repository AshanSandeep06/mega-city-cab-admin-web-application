// features/drivers/CreateDriverForm.tsx
"use client";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import FormRow from "@/components/FormRow";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SpinnerMini from "@/components/Loader";

import { useCreateDriver } from "./hooks/useCreateDriver";
import { useUpdateDriver } from "./hooks/useUpdateDriver";
import { Driver, DriverDto } from "@/types";

interface CreateDriverFormProps {
    driver?: Driver;
    onCloseModal?: () => void;
}

const CreateDriverForm: React.FC<CreateDriverFormProps> = ({ driver, onCloseModal }) => {
    const isEditSession = Boolean(driver?.driverId);
    const { isCreating, createDriver } = useCreateDriver();
    const { isUpdating, editDriver } = useUpdateDriver();
    const isWorking = isCreating || isUpdating;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            name: driver?.name || "",
            age: driver?.age || 0,
            email: driver?.email || "",
            licenseNumber: driver?.licenseNumber || "",
            contactNumber: driver?.contactNumber || "",
            nic: driver?.nic || "",
            address: driver?.address || "",
            status: driver?.status || "Available",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const dto: DriverDto = {
            driverId: driver?.driverId,
            name: data.name,
            age: Number(data.age),
            email: data.email,
            licenseNumber: data.licenseNumber,
            contactNumber: data.contactNumber,
            nic: data.nic,
            address: data.address,
            status: data.status,
        };

        if (isEditSession) {
            editDriver(dto, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        } else {
            createDriver(dto, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        }
    };

    const onError = (err: any) => {
        console.log("Form submission error:", err);
    };

    return (
        <form className="w-[800px] text-[14px]" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Name" error={errors?.name?.message} id="name">
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Age" error={errors?.age?.message} id="age">
                <Input
                    type="number"
                    id="age"
                    disabled={isWorking}
                    {...register("age", {
                        required: "This field is required",
                        min: { value: 18, message: "Age must be at least 18" },
                    })}
                />
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message} id="email">
                <Input
                    type="email"
                    id="email"
                    disabled={isWorking}
                    {...register("email", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="License Number" error={errors?.licenseNumber?.message} id="licenseNumber">
                <Input
                    type="text"
                    id="licenseNumber"
                    disabled={isWorking}
                    {...register("licenseNumber", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Contact Number" error={errors?.contactNumber?.message} id="contactNumber">
                <Input
                    type="text"
                    id="contactNumber"
                    disabled={isWorking}
                    {...register("contactNumber", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="NIC" error={errors?.nic?.message} id="nic">
                <Input
                    type="text"
                    id="nic"
                    disabled={isWorking}
                    {...register("nic", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Address" error={errors?.address?.message} id="address">
                <Input
                    type="text"
                    id="address"
                    disabled={isWorking}
                    {...register("address", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Status" error={errors?.status?.message} id="status">
                <select
                    id="status"
                    disabled={isWorking}
                    {...register("status", { required: "This field is required" })}
                    className="w-full p-2 border rounded"
                >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                </select>
            </FormRow>

            <FormRow hasButton>
                <Button variant="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking} type="submit" className="flex items-center gap-2">
                    {isWorking && <SpinnerMini />}
                    <span>{isEditSession ? "Edit Driver" : "Create New Driver"}</span>
                </Button>
            </FormRow>
        </form>
    );
};

export default CreateDriverForm;
