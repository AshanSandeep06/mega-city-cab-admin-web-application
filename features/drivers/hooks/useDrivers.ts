// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { VehicleCustomResult } from "@/types";
//
// export const useDrivers = (query: Record<string, any> = {}) => {
//   const {
//     isLoading,
//     data: drivers = [],
//     error,
//   } = useQuery<VehicleCustomResult[], Error>({
//     queryKey: ["drivers", query],
//     queryFn: () => getAllDrivers(query),
//   });
//
//   return { isLoading, drivers, error };
// };

// features/drivers/hooks/useDrivers.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllDrivers } from "@/services/apiDriver";
import { DriverDto } from "@/types";

export const useDrivers = (query: Record<string, any> = {}) => {
  const { isLoading, data: drivers = [], error } = useQuery<DriverDto[], Error>({
    queryKey: ["drivers", query],
    queryFn: () => getAllDrivers(query),
  });

  return { isLoading, drivers, error };
};
