// // features/vehicles/Vehicles.tsx
// import React from "react";
//
// import VehicleTable from "@/features/vehicles/VehicleTable";
// import AddVehicle from "@/features/vehicles/AddVehicle";
// import VehicleTableOperation from "@/features/vehicles/VehicleTableOperation";
//
// const Vehicles = () => {
//     return (
//         <>
//             <div className="flex justify-between items-center">
//                 <h1 className="text-[24px] dark:text-gray-100 font-semibold">All Vehicles</h1>
//                 <VehicleTableOperation />
//             </div>
//
//             <div className="flex flex-col gap-4">
//                 <VehicleTable />
//                 <AddVehicle />
//             </div>
//         </>
//     );
// };
//
// export default Vehicles;
//------------------------------------------------------------------------------------



// features/vehicles/Vehicles.tsx
import React from "react";
import VehicleTableOperation from "@/features/vehicles/VehicleTableOperation";
import VehicleTable from "@/features/vehicles/VehicleTable";
import AddVehicle from "@/features/vehicles/AddVehicle";

const Vehicles = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-[24px] dark:text-gray-100 font-semibold">All Vehicles</h1>
                <VehicleTableOperation />
            </div>

            <div className="flex flex-col gap-4">
                <VehicleTable />
                <AddVehicle />
            </div>
        </>
    );
};

export default Vehicles;
