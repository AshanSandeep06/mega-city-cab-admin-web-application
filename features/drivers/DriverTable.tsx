// features/drivers/DriverTable.tsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import Table from "@/components/Table";
import Menus from "@/components/Menu";
import DriverRow from "./DriverRow";
import { useDrivers } from "./hooks/useDrivers";
import { DriverDto } from "@/types";
import queryString from "query-string";

const DriverTable = () => {
    const params = useSearchParams();
    const query = queryString.parse(params.toString());
    const { isLoading, drivers = [], error } = useDrivers(query);


    return (
        <Menus>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <Table
                className="bg-white dark:bg-black w-full"
                columns="75px 2fr 1fr 2fr 1fr 1fr"
            >
                <Table.Header>
                    <div role="rowheader">ID</div>
                    <h4 role="rowheader">Name</h4>
                    <h4 role="rowheader">Age</h4>
                    <h4 role="rowheader">Email</h4>
                    <h4 role="rowheader">Status</h4>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={drivers}
                    isLoading={isLoading}
                    emptyMessage={error ? error.message : "No drivers found"}
                    render={(driver: DriverDto) => <DriverRow driver={driver} key={driver.driverId} />}
                />
            </Table>
        </Menus>
    );
};

export default DriverTable;
