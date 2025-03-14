// features/vehicles/hooks/useUpdateVehicle.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateVehicle } from "@/services/apiVehicle";
import { Vehicle, VehicleDto } from "@/types";

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: editVehicle } = useMutation<
        Vehicle,
        Error,
        { dto: VehicleDto; imageFile: File }
    >({
        mutationFn: ({ dto, imageFile }) => updateVehicle(dto, imageFile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
            toast.success("Vehicle successfully edited!");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isUpdating, editVehicle };
};
