// features/drivers/hooks/useDeleteDriver.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDriver } from "@/services/apiDriver";
import { Driver } from "@/types";

export const useDeleteDriver = () => {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteDriverMutation } = useMutation<
        Driver,
        Error,
        number
    >({
        mutationFn: (driverId) => deleteDriver(driverId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drivers"] });
            toast.success("Driver successfully deleted!");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isDeleting, deleteDriver: deleteDriverMutation };
};
