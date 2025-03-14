// features/drivers/hooks/useUpdateDriver.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateDriver } from "@/services/apiDriver";
import { Driver, DriverDto } from "@/types";

export const useUpdateDriver = () => {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: editDriver } = useMutation<
        Driver,
        Error,
        DriverDto
    >({
        mutationFn: (dto) => updateDriver(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            toast.success("Driver successfully updated!");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isUpdating, editDriver };
};
