// pages/bookings/[bookingId].tsx (or wherever your component lives)
import React from "react";
import BookingDetail from "@/features/bookings/BookingDetail";
import Axios from "@/lib/axios/common";

// Define the Booking interface for TypeScript type safety
interface Booking {
  bookingId: number;
  customerId: number;
  vehicleId: number;
  driverId: number;
  pickUpLocation: string;
  dropLocation: string;
  hours: string;
  totalKm: number;
  bookingDateTime: string; // Adjusted to string for JSON serialization
  totalAmount: number;
  estimatedBookingDateTime: string | null;
  status: string;
}

interface IParams {
  bookingId?: string;
}

// Function to fetch booking by bookingId
const getBooking = async (bookingId: string): Promise<Booking> => {
  try {
    const response = await Axios.get(`/booking?bookingId=${bookingId}`);
    return response.data.data; // Extract booking from StandardResponse
  } catch (error: any) {
    console.error("Error fetching booking:", error.response?.data || error.message);
    throw error; // Re-throw for component-level handling
  }
};

const Booking = async ({ params: { bookingId } }: { params: IParams }) => {
  try {
    const booking = await getBooking(bookingId!);
    return <BookingDetail booking={booking} />;
  } catch (error) {
    console.error("Failed to load booking:", error);
    return (
        <div className="error-message">
          Error loading booking details. Please try again later.
        </div>
    ); // Improved fallback UI
  }
};

export default Booking;
