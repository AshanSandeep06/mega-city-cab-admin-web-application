// import { getVehicles } from "@/services/apiVehicle";
// import { useQuery } from "@tanstack/react-query";
//
// export const useVehicles = () => {
//   const {
//     isLoading,
//     data: vehicles,
//     error,
//   } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getVehicles,
//   });
//
//   return { isLoading, vehicles };
// };

// -------------------------------------------------------------


// features/vehicles/hooks/useVehicles.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllVehiclesWithCategory } from "@/services/apiVehicle";
import { VehicleCustomResult } from "@/types";

export const useVehicles = (query: Record<string, any> = {}) => {
  const {
    isLoading,
    data: vehicles = [],
    error,
  } = useQuery<VehicleCustomResult[], Error>({
    queryKey: ["vehicles", query],
    queryFn: () => getAllVehiclesWithCategory(query),
  });

  return { isLoading, vehicles, error };
};
