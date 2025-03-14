// // components/vehicles/VehicleTable.tsx
// "use client";
// import React from "react";
// import { useSearchParams } from "next/navigation";
//
// import Table from "@/components/Table";
// import Menus from "@/components/Menu";
// import VehicleRow from "./VehicleRow";
// import { useVehicles } from "./hooks/useVehicles";
// import { Vehicle } from "@/types";
//
// const VehicleTable = () => {
//   const { isLoading, vehicles = [] } = useVehicles();
//   const searchParams = useSearchParams();
//   const filterValue = searchParams.get("status") || "all";
//
//   let filteredVehicles: Vehicle[];
//   if (filterValue === "all") {
//     filteredVehicles = vehicles;
//   } else {
//     filteredVehicles = vehicles.filter(
//       (vehicle: Vehicle) => vehicle.status === filterValue
//     );
//   }
//
//   const sortBy = searchParams.get("sortBy") || "vehicleModel-asc";
//   const [field, direction] = sortBy.split("-");
//   const modifier = direction === "asc" ? 1 : -1;
//
//   const sortedVehicles =
//     filteredVehicles &&
//     filteredVehicles.sort((a: any, b: any) => {
//       if (a[field] < b[field]) return -1 * modifier;
//       if (a[field] > b[field]) return 1 * modifier;
//       return 0;
//     });
//
//   return (
//     <Menus>
//       <Table
//         className="bg-white dark:bg-black w-full"
//         columns="75px 2fr 1fr 1fr 1fr 1fr 1fr"
//       >
//         <Table.Header>
//           <div role="rowheader"></div>
//           <h4 role="rowheader">Vehicle Model</h4>
//           <h4 role="rowheader">Passengers</h4>
//           <h4 role="rowheader">Price/Km</h4>
//           <h4 role="rowheader">Status</h4>
//           <h4 role="rowheader">Category</h4>
//           <div></div>
//         </Table.Header>
//
//         <Table.Body
//           data={sortedVehicles}
//           isLoading={isLoading}
//           emptyMessage="No vehicles found"
//           render={(vehicle: Vehicle) => (
//             <VehicleRow vehicle={vehicle} key={vehicle.vehicleId} />
//           )}
//         />
//       </Table>
//     </Menus>
//   );
// };
//
// export default VehicleTable;


// ------------------------------------------------------------------------------------------------


// features/vehicles/VehicleTable.tsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import Table from "@/components/Table";
import Menus from "@/components/Menu";
import VehicleRow from "./VehicleRow";
import { useVehicles } from "./hooks/useVehicles";
import { VehicleCustomResult } from "@/types";
import {useBookings} from "@/features/bookings/hooks/useBookings";
import queryString from "query-string";

const VehicleTable = () => {
    const params = useSearchParams();
    const query = queryString.parse(params.toString());

    const { isLoading, vehicles = [], error } = useVehicles(query);


    return (
        <Menus>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <Table
                className="bg-white dark:bg-black w-full"
                columns="75px 2fr 1fr 1fr 1fr 1fr 1fr"
            >
                <Table.Header>
                    <div role="rowheader"></div>
                    <h4 role="rowheader">Vehicle Model</h4>
                    <h4 role="rowheader">Passengers</h4>
                    <h4 role="rowheader">Price/Km</h4>
                    <h4 role="rowheader">Status</h4>
                    <h4 role="rowheader">Category</h4>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={vehicles}
                    isLoading={isLoading}
                    emptyMessage={error ? error.message : "No vehicles found"}
                    render={(vehicle: VehicleCustomResult) => (
                        <VehicleRow vehicle={vehicle} key={vehicle.vehicleId} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default VehicleTable;
