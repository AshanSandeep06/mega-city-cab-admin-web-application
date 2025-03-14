// features/bookings/hooks/useGetBookingById.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/services/apiBooking";

export const useGetBookingById = (bookingId: number) => {
    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBookingById(bookingId.toString()),
        enabled: !!bookingId, // Only fetch if bookingId is provided
    });

    return { isLoading, booking, error };
};
