// import axios from "axios";
// import queryString from "query-string";
//
// export const getBooking = async (query: {}) => {
//   const urlWithQuery = queryString.stringifyUrl({
//     url: "/api/booking",
//     query,
//   });
// }
// export const getBookings = async (query: {}) => {
//   const urlWithQuery = queryString.stringifyUrl({
//     url: "/api/booking",
//     query,
//   });
//   try {
//     // const { data } = await axios.get(urlWithQuery);
//     const data = [
//       {
//         bookingId: 1,
//         customerId: 101,
//         vehicleId: 201,
//         driverId: 301,
//         pickUpLocation: "Lagos",
//         dropLocation: "Abuja",
//         hours: "2",
//         totalKm: 150.5,
//         bookingDateTime: "2021-10-10T12:00:00",
//         totalAmount: 10000,
//         estimatedBookingDateTime: "2021-10-10T14:00:00",
//         status: "Pending",
//       },
//       {
//         bookingId: 2,
//         customerId: 102,
//         vehicleId: 202,
//         driverId: 302,
//         pickUpLocation: "Lagos",
//         dropLocation: "Abuja",
//         hours: "3",
//         totalKm: 200.0,
//         bookingDateTime: "2021-10-10T12:00:00",
//         totalAmount: 15000,
//         estimatedBookingDateTime: "2021-10-10T15:00:00",
//         status: "Pending",
//       },
//       {
//         bookingId: 3,
//         customerId: 103,
//         vehicleId: 203,
//         driverId: 303,
//         pickUpLocation: "Lagos",
//         dropLocation: "Abuja",
//         hours: "1.5",
//         totalKm: 120.0,
//         bookingDateTime: "2021-10-10T12:00:00",
//         totalAmount: 8000,
//         estimatedBookingDateTime: "2021-10-10T13:30:00",
//         status: "Confirmed",
//       },
//     ];
//     return data;
//   } catch (error) {
//     throw new Error("failed to fetch bookings");
//   }
// };
//
// export const updateBooking = async (id: string, payload: {}) => {
//   try {
//     const { data } = await axios.patch(`/api/booking/check-in/${id}`, payload);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
//
// export const deleteBooking = async (id: string) => {
//   try {
//     const { data } = await axios.delete(`/api/booking/${id}`);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
//
// export const getBookingsAFterDate = async (date: string) => {
//   try {
//     const urlWithQuery = queryString.stringifyUrl({
//       url: "/api/booking/recent-bookings",
//       query: {
//         createdAt: date,
//       },
//     });
//
//     const { data } = await axios.get(urlWithQuery);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
//
// export const getStaysAFterDate = async (date: string) => {
//   try {
//     const urlWithQuery = queryString.stringifyUrl({
//       url: "/api/booking/recent-stays",
//       query: {
//         startDate: date,
//       },
//     });
//
//     const { data } = await axios.get(urlWithQuery);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
//
// export async function getStaysTodayActivity() {
//   try {
//     const { data } = await axios.get("/api/booking/today-activity");
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

// ---------------------------------------------------------------------------------------------------------

// services/apiBooking.ts
import queryString from "query-string";
import Axios from "@/lib/axios/common";

interface StandardResponse {
  code: number;
  message: string;
  data: any;
}

// Interface for Booking (adjust based on your backend response)
interface Booking {
  bookingId: number;
  customerId: number;
  vehicleId: number;
  driverId: number;
  pickUpLocation: string;
  dropLocation: string;
  hours: string;
  totalKm: number;
  bookingDateTime: string;
  totalAmount: number;
  estimatedBookingDateTime: string | null;
  status: string;
}

// Interface for CustomBookingDetails (adjust if different from Booking)
interface CustomBookingDetails extends Booking {}

// Get all booking details
export const getAllBookings = async (query: Record<string, any> = {}): Promise<CustomBookingDetails[]> => {
  const urlWithQuery = queryString.stringifyUrl({
    url: "/booking/bookingDetails",
    query,
  });

  try {
    const response = await Axios.get<StandardResponse>(urlWithQuery);
    return response.data.data; // Extract booking details
  } catch (error: any) {
    console.error("Error fetching filtered bookings:", error.response?.data || error.message);
    throw new Error("Failed to fetch bookings");
  }
};


// export const getAllBookings = async (query: Record<string, any> = {}): Promise<CustomBookingDetails[]> => {
//   const urlWithQuery = queryString.stringifyUrl({
//     url: "/booking/bookingDetails", // Updated to match backend @GetMapping("/bookingDetails")
//     query,
//   });
//
//   try {
//     //     const data = [
//     //   {
//     //     bookingId: 1,
//     //     customerId: 101,
//     //     vehicleId: 201,
//     //     driverId: 301,
//     //     pickUpLocation: "Lagos",
//     //     dropLocation: "Abuja",
//     //     hours: "2",
//     //     totalKm: 150.5,
//     //     bookingDateTime: "2021-10-10T12:00:00",
//     //     totalAmount: 10000,
//     //     estimatedBookingDateTime: "2021-10-10T14:00:00",
//     //     status: "Pending",
//     //   },
//     //   {
//     //     bookingId: 2,
//     //     customerId: 102,
//     //     vehicleId: 202,
//     //     driverId: 302,
//     //     pickUpLocation: "Lagos",
//     //     dropLocation: "Abuja",
//     //     hours: "3",
//     //     totalKm: 200.0,
//     //     bookingDateTime: "2021-10-10T12:00:00",
//     //     totalAmount: 15000,
//     //     estimatedBookingDateTime: "2021-10-10T15:00:00",
//     //     status: "Pending",
//     //   },
//     //   {
//     //     bookingId: 3,
//     //     customerId: 103,
//     //     vehicleId: 203,
//     //     driverId: 303,
//     //     pickUpLocation: "Lagos",
//     //     dropLocation: "Abuja",
//     //     hours: "1.5",
//     //     totalKm: 120.0,
//     //     bookingDateTime: "2021-10-10T12:00:00",
//     //     totalAmount: 8000,
//     //     estimatedBookingDateTime: "2021-10-10T13:30:00",
//     //     status: "Confirmed",
//     //   },
//     // ];
//     const response = await Axios.get<StandardResponse>(urlWithQuery);
//     return response.data.data;
//   } catch (error: any) {
//     console.error("Error fetching all booking details:", error.response?.data || error.message);
//     throw new Error("Failed to fetch booking details");
//   }
// };

// Get a single booking by ID
export const getBookingById = async (bookingId: string): Promise<Booking> => {
  const url = `/booking/view/${bookingId}`; // Updated to match backend @GetMapping("/view/{bookingId}")

  try {
    const response = await Axios.get<StandardResponse>(url);
    return response.data.data; // Extract the booking object from the response
  } catch (error: any) {
    console.error("Error fetching booking by ID:", error.response?.data || error.message);
    throw new Error(`Failed to fetch booking with ID ${bookingId}`);
  }
};


// Update a booking status
export const updateBookingStatus = async (bookingId: string, payload: Record<string, any> = {}): Promise<Booking> => {
  const urlWithQuery = queryString.stringifyUrl({
    url: "/booking", // Updated to match backend @PutMapping(params = {"bookingId"})
    query: { bookingId },
  });

  try {
    const response = await Axios.put<StandardResponse>(urlWithQuery);
    return response.data.data; // Extract the updated booking from the response
  } catch (error: any) {
    console.error("Error updating booking status:", error.response?.data || error.message);
    throw new Error(error.message || "Failed to update booking status");
  }
};

// Delete a booking
export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const response = await Axios.delete<StandardResponse>(`/booking/${id}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error deleting booking:", error.response?.data || error.message);
    throw new Error(error.message || "Failed to delete booking");
  }
};
