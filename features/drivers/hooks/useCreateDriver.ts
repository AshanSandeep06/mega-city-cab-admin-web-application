// features/drivers/hooks/useCreateDriver.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { saveDriver } from "@/services/apiDriver";
import { Driver, DriverDto } from "@/types";

export const useCreateDriver = () => {
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate: createDriver } = useMutation<
        Driver,
        Error,
        DriverDto
    >({
        mutationFn: (dto) => saveDriver(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            toast.success("New driver successfully created!");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isCreating, createDriver };
};
