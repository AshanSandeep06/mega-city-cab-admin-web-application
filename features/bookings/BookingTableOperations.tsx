import React from "react";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import {
  bookingSortByOptions as sortByOptions, bookingStatus,
} from "@/utils/constants";

const BookingTableOperations = () => {
  return (
    <div className="flex items-center gap-4">
      <Filter filterField="status" options={bookingStatus} />

      {/*<SortBy options={sortByOptions} />*/}
    </div>
  );
};

export default BookingTableOperations;
