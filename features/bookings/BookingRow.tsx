"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { HiEye, HiTrash, HiCheckCircle, HiXCircle } from "react-icons/hi2";

import Table from "@/components/Table";
import Menu from "@/components/Menu";
import Modal from "@/components/Modal";
import ConfirmDelete from "@/components/ConfirmDelete";
import { formatCurrency } from "@/utils/helpers";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "@/services/apiBooking";
import { toast } from "react-hot-toast";

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

interface BookingRowProps {
    booking: Booking;
}

const BookingRow: FC<BookingRowProps> = ({ booking }) => {
    const router = useRouter();
    const { isDeleting, deleteBooking } = useDeleteBooking();
    const queryClient = useQueryClient();
    const [currentStatus, setCurrentStatus] = useState(booking.status);

    const { mutate: updateStatus, isLoading: isUpdating } = useMutation({
        mutationFn: () => updateBookingStatus(booking.bookingId.toString()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            setCurrentStatus("Confirmed");
            toast.success("Booking status updated successfully");
        },
        onError: (err: any) => {
            const errorMessage = err.response?.data?.message || "Failed to update booking status";
            console.error("Backend Error: ", errorMessage);
            toast.error(errorMessage);
        },
    });

    const onDelete = (closeModal?: () => void) => {
        deleteBooking(booking.bookingId, {
            onSettled: () => closeModal?.(),
        });
    };

    return (
        <Table.Row>
            <span className="text-gray-600 dark:text-gray-300">{booking.customerId}</span>
            <span className="text-gray-600 dark:text-gray-300">{booking.vehicleId}</span>
            <span className="text-gray-600 dark:text-gray-300">{booking.driverId}</span>
            <span className="text-gray-600 dark:text-gray-300 font-sono">{booking.pickUpLocation}</span>
            <span className="text-gray-600 dark:text-gray-300 font-sono">{booking.dropLocation}</span>
            <span className="text-gray-600 dark:text-gray-300">{booking.hours}</span>
            <span className="font-medium dark:text-gray-300">
         {booking.bookingDateTime
             ? format(new Date(booking.bookingDateTime), "yyyy-MM-dd HH:mm:ss.SSSSSS")
             : format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSSSS")}
            </span>
            <span className="font-medium dark:text-gray-300">
                {booking.estimatedBookingDateTime
                    ? format(new Date(booking.estimatedBookingDateTime), "MMM dd yyyy, HH:mm:ss")
                    : format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSSSS")}
            </span>
            <span
                className={`w-fit uppercase text-[11px] font-semibold py-1 px-3 rounded-full ${
                    currentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : currentStatus === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                }`}
            >
                {currentStatus}
            </span>
            <span className="font-medium dark:text-gray-300">
                {formatCurrency(booking.totalAmount)}
            </span>
            <Menu>
                <Menu.Toggle id={booking.bookingId.toString()} />
                <Menu.List id={booking.bookingId.toString()}>
                    <Menu.Button
                        icon={HiEye}
                        onClick={() => router.push(`/bookings/${booking.bookingId}`)}
                    >
                        See details
                    </Menu.Button>
                    {currentStatus === "Pending" && (
                        <>
                            <Menu.Button
                                icon={HiCheckCircle}
                                onClick={() => updateStatus()}
                                disabled={isUpdating}
                            >
                                Confirm Booking
                            </Menu.Button>
                            <Menu.Button
                                icon={HiXCircle}
                                onClick={() => updateStatus()}
                                disabled={isUpdating}
                            >
                                Deny Booking
                            </Menu.Button>
                        </>
                    )}
                    <Modal.Open opens="delete">
                        <Menu.Button
                            icon={HiTrash}
                            onClick={() => console.log("Delete clicked:", booking.bookingId)}
                        >
                            Delete booking
                        </Menu.Button>
                    </Modal.Open>
                </Menu.List>
                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="booking"
                        disabled={isDeleting}
                        onConfirm={onDelete}
                        isLoading={isDeleting}
                    />
                </Modal.Window>
            </Menu>
        </Table.Row>
    );
};

export default BookingRow;
