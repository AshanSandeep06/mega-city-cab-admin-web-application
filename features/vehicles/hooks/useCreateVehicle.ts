// import { toast } from "react-hot-toast";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createEditCabin } from "@/services/apiVehicle";
//
// export const useCreateOrEditVehicles = (isEditSession?: boolean) => {
//     const queryClient = useQueryClient();
//     const { mutate: createOrEditCabin, isLoading: isWorking } =
//       useMutation({
//         mutationFn: createEditCabin,
//         onSuccess: () => {
//           toast.success(
//             `${
//               isEditSession
//                 ? "Vehicle successfully edited!"
//                 : "New vehicle successfully created!"
//             }`
//           );
//           queryClient.invalidateQueries({
//             queryKey: ["cabins"],
//           });
//         },
//         onError: (err: any) => {
//           toast.error(err.message);
//         },
//       });
//
//       return {isWorking, createOrEditCabin}
// }

// --------------------------------------------------------------


// features/vehicles/hooks/useCreateVehicle.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { saveVehicle } from "@/services/apiVehicle";
import { Vehicle, VehicleDto } from "@/types";

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate: createVehicle } = useMutation<
        Vehicle,
        Error,
        { dto: VehicleDto; imageFile: File }
    >({
        mutationFn: ({ dto, imageFile }) => saveVehicle(dto, imageFile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
            toast.success("New vehicle successfully created!");
        },
        onError: (err: any) => toast.error(err.message),
    });

    return { isCreating, createVehicle };
};
