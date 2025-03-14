// features/bookings/BookingTable.tsx
"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";

import Menu from "@/components/Menu";
import Table from "@/components/Table";
import BookingRow from "./BookingRow";

import { useBookings } from "./hooks/useBookings";

const BookingTable = () => {
    const params = useSearchParams();
    const query = queryString.parse(params.toString());
    const { isLoading, bookings = [], error } = useBookings(query);
    const [filter, setFilter] = useState("All");

    return (
        <div>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <Menu>
                <Table
                    className="bg-white dark:bg-black w-full"
                    columns="1fr 1fr 1fr 2fr 2fr 1fr 2fr 2fr 1fr 1fr 3rem"
                >
                    <Table.Header>
                        <h4 role="rowheader">Customer ID</h4>
                        <h4 role="rowheader">Vehicle ID</h4>
                        <h4 role="rowheader">Driver ID</h4>
                        <h4 role="rowheader">Pick-Up Location</h4>
                        <h4 role="rowheader">Drop-Off Location</h4>
                        <h4 role="rowheader">Hours</h4>
                        <h4 role="rowheader">Booking Date</h4>
                        <h4 role="rowheader">Estimated End</h4>
                        <h4 role="rowheader">Status</h4>
                        <h4 role="rowheader">Amount</h4>
                        <div></div>
                    </Table.Header>
                    <Table.Body
                        data={bookings}
                        render={(booking) => <BookingRow key={booking.bookingId} booking={booking} />}
                        isLoading={isLoading}
                        emptyMessage="No bookings found"
                    />
                </Table>
            </Menu>
        </div>
    );
};

export default BookingTable;
