// features/bookings/hooks/useBookings.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "@/services/apiBooking";

export const useBookings = (query: Record<string, any> = {}) => {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", query], // Include query in key to refetch on change
    queryFn: () => getAllBookings(query),
  });

  return { isLoading, bookings, error };
};
