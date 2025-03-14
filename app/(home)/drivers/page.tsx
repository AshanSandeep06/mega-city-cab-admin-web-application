import React from "react";
import VehicleTableOperation from "@/features/drivers/VehicleTableOperation";
import DriverTable from "@/features/drivers/DriverTable";
import AddDriver from "@/features/drivers/AddDriver";

const Drivers = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-[24px] dark:text-gray-100 font-semibold">All Drivers</h1>
                <VehicleTableOperation />
            </div>

            <div className="flex flex-col gap-4">
                <DriverTable />
                <AddDriver />
            </div>
        </>
    );
};

export default Drivers;
