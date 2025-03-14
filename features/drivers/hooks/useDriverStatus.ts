// features/drivers/hooks/useDriverStatus.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changeDriverStatus, updateDriverStatus } from "@/services/apiDriver";

export const useChangeDriverStatus = () => {
    const { isLoading: isChanging, mutate: changeStatus } = useMutation<boolean, Error, number>({
        mutationFn: (driverId) => changeDriverStatus(driverId),
        onSuccess: () => toast.success("Driver status changed to Busy!"),
        onError: (err: any) => toast.error(err.message),
    });
    return { isChanging, changeStatus };
};

export const useUpdateDriverStatus = () => {
    const { isLoading: isUpdating, mutate: updateStatus } = useMutation<boolean, Error, number>({
        mutationFn: (driverId) => updateDriverStatus(driverId),
        onSuccess: () => toast.success("Driver status changed to Available!"),
        onError: (err: any) => toast.error(err.message),
    });
    return { isUpdating, updateStatus };
};
