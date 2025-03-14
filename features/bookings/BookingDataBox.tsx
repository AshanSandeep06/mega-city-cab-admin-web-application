import React, { FC } from "react";
import { format } from "date-fns";
import {
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
} from "react-icons/hi";
import DataItem from "@/components/DataItem";
import { formatCurrency } from "@/utils/helpers";

interface BookingDataBoxProps {
  booking: any;
}

const BookingDataBox: FC<BookingDataBoxProps> = ({ booking }) => {
  const {
    bookingId,
    customerId,
    vehicleId,
    driverId,
    pickUpLocation,
    dropLocation,
    hours,
    totalKm,
    bookingDateTime,
    amount,
    status,
  } = booking;

  return (
    <section className="bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-md overflow-hidden">
      <header className="bg-indigo-500 py-[18px] px-10 text-[#e0e7ff] font-medium flex items-center justify-between">
        <div className="flex items-center gap-4 font-medium text-[16px]">
          <HiOutlineLocationMarker className="h-[24px] w-[24px]" />
          <p>
            {pickUpLocation} → {dropLocation}
          </p>
        </div>

        <p className="text-[15px]">
          {format(new Date(bookingDateTime), "EEE, MMM dd yyyy, HH:mm:ss")}
        </p>
      </header>

      <section className="pt-8 pb-3 px-10 text-[14px]">
        <DataItem icon={HiOutlineClock} label="Duration">
          <span className="dark:text-gray-300">{hours} hours</span>
        </DataItem>

        <DataItem icon={HiOutlineCheckCircle} label="Total Distance">
          <span className="dark:text-gray-300">{totalKm} km</span>
        </DataItem>

        <div
          className={`flex items-center justify-between py-[12px] px-6 rounded-md mt-6 $`}
        >
          <DataItem
            icon={HiOutlineCurrencyDollar}
            label={`Total Amount`}
            iconStyle="!text-inherit"
            className="!text-inherit"
          >
            <span>{formatCurrency(amount)}</span>
          </DataItem>

          <p className="uppercase text-[13.25px] font-semibold">
            {status}
          </p>
        </div>
      </section>

      <footer className="py-4 px-10 text-[12px] text-gray-500 dark:text-gray-400 text-right">
        <p>Booking ID: {bookingId}</p>
        <p>Customer ID: {customerId}</p>
        <p>Vehicle ID: {vehicleId}</p>
        <p>Driver ID: {driverId}</p>
      </footer>
    </section>
  );
};

export default BookingDataBox;
