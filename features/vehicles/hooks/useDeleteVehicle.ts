// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { deleteVehicle as removeCabin } from "@/services/apiVehicle";
//
// export const useDeleteVehicle = () => {
//   const queryClient = useQueryClient();
//   const { isLoading: isDeleting, mutate: deleteVehicle } = useMutation({
//     mutationFn: removeCabin,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       toast.success("Vehicle successfully deleted");
//     },
//     onError: (err: any) => {
//       toast.error(err.message);
//     },
//   });
//
//   return { isDeleting, deleteVehicle };
// };

// -----------------------------------------------------------

// features/vehicles/hooks/useDeleteVehicle.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteVehicle } from "@/services/apiVehicle";

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: removeVehicle } = useMutation<void, Error, number>({
        mutationFn: (vehicleId) => deleteVehicle(vehicleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
            toast.success("Vehicle deleted successfully");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isDeleting, removeVehicle };
};
