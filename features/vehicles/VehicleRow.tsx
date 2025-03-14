// // VehicleRow.tsx
// "use client";
// import React from "react";
// import Image from "next/image";
// import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import ConfirmDelete from "@/components/ConfirmDelete";
// import CreateVehicleForm from "./CreateVehicleForm";
// import Modal from "@/components/Modal";
// import Table from "@/components/Table";
// import Menu from "@/components/Menu";
//
// import { useDeleteVehicle } from "./hooks/useDeleteVehicle";
// import { useCreateOrEditVehicles } from "./hooks/useCreateVehicle";
// import { formatCurrency } from "@/utils/helpers";
// import { Vehicle } from "@/types";
//
// interface VehicleRowProps {
//   vehicle: Vehicle;
// }
//
// const VehicleRow: React.FC<VehicleRowProps> = ({ vehicle }) => {
//   const { isDeleting, deleteVehicle } = useDeleteVehicle();
//   const { createOrEditCabin } = useCreateOrEditVehicles();
//   const {
//     vehicleId,
//     plateNumber,
//     passengerCount,
//     pricePerKm,
//     vehicleModel,
//     status,
//     image,
//     category,
//   } = vehicle;
//
//   const handleDuplicate = () => {
//     // createOrEditCabin({
//     //   plateNumber: plateNumber + " copy",
//     //   passengerCount,
//     //   pricePerKm,
//     //   vehicleModel,
//     //   status,
//     //   image,
//     //   category,
//     // });
//   };
//
//   // const onDelete = (closeModal?: () => void) =>
//   //   deleteCabin(vehicleId, {
//   //     onSettled: () => {
//   //       closeModal?.();
//   //     },
//   //   });
//
//   return (
//     <Table.Row>
//       <div className="w-[75px] h-[48px] relative">
//         <Image
//           src={image}
//           alt={vehicleModel}
//           fill
//           sizes="75px"
//           className="object-cover"
//         />
//       </div>
//       <div>
//         <h4 className="text-[15px] font-sono text-gray-600 dark:text-gray-300 font-semibold">
//           {vehicleModel}
//         </h4>
//         <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
//           Plate: {plateNumber}
//         </span>
//       </div>
//       <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
//         {passengerCount} Passengers
//       </span>
//       <span className="font-sono font-semibold dark:text-gray-300">
//         {formatCurrency(pricePerKm)} / Km
//       </span>
//       <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
//         {status}
//       </span>
//       <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
//         {category}
//       </span>
//       <Modal>
//         <Menu>
//           <Menu.Toggle id={String(vehicleId)} />
//           <Menu.List id={String(vehicleId)}>
//             <Menu.Button icon={HiSquare2Stack} onClick={handleDuplicate}>
//               Duplicate
//             </Menu.Button>
//             <Modal.Open opens="edit">
//               <Menu.Button icon={HiPencil}>Edit</Menu.Button>
//             </Modal.Open>
//             <Modal.Open opens="delete">
//               <Menu.Button icon={HiTrash}>Delete</Menu.Button>
//             </Modal.Open>
//           </Menu.List>
//         </Menu>
//
//         <Modal.Window name="edit">
//           <CreateVehicleForm vehicle={vehicle} />
//         </Modal.Window>
//
//         <Modal.Window name="delete">
//           <ConfirmDelete
//             isLoading={isDeleting}
//             disabled={isDeleting}
//             onConfirm={/*onDelete*/ () => {}}
//             resourceName="vehicles"
//           />
//         </Modal.Window>
//       </Modal>
//     </Table.Row>
//   );
// };
//
// export default VehicleRow;


// ====================================================================================================


// features/vehicles/VehicleRow.tsx
"use client";
import React from "react";
import Image from "next/image";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "@/components/ConfirmDelete";
import CreateVehicleForm from "./CreateVehicleForm";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Menu from "@/components/Menu";

import { useDeleteVehicle } from "./hooks/useDeleteVehicle";
import { useCreateVehicle } from "./hooks/useCreateVehicle";
import { formatCurrency } from "@/utils/helpers";
import { VehicleCustomResult, VehicleDto } from "@/types";

interface VehicleRowProps {
    vehicle: VehicleCustomResult;
}

const VehicleRow: React.FC<VehicleRowProps> = ({ vehicle }) => {
    const { isDeleting, removeVehicle } = useDeleteVehicle();
    const { createVehicle } = useCreateVehicle();

    const {
        vehicleId,
        plateNumber,
        passengerCount,
        pricePerKm,
        model: vehicleModel,
        vehicleStatus: status,
        image,
        category,
    } = vehicle;

    const handleDuplicate = () => {
        const dto: VehicleDto = {
            plateNumber: plateNumber + " copy",
            passengerCount,
            pricePerKm,
            vehicleModel,
            status,
            category,
        };
        createVehicle({ dto, imageFile: new File([], "placeholder.jpg") }); // Placeholder for image; update with actual file if needed
    };

    const onDelete = (closeModal?: () => void) =>
        removeVehicle(vehicleId, {
            onSettled: () => closeModal?.(),
        });

    return (
        <Table.Row>
            <div className="w-[75px] h-[48px] relative">
                <Image
                    src={`data:image/jpeg;base64,${image}`}
                    alt={vehicleModel}
                    fill
                    sizes="75px"
                    className="object-cover"
                />
            </div>
            <div>
                <h4 className="text-[15px] font-sono text-gray-600 dark:text-gray-300 font-semibold">
                    {vehicleModel}
                </h4>
                <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
          Plate: {plateNumber}
        </span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
        {passengerCount} Passengers
      </span>
            <span className="font-sono font-semibold dark:text-gray-300">
        {formatCurrency(pricePerKm)} / Km
      </span>
            <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
        {status}
      </span>
            <span className="text-gray-500 dark:text-gray-400 text-[12.75px]">
        {category}
      </span>
            <Modal>
                <Menu>
                    <Menu.Toggle id={String(vehicleId)} />
                    <Menu.List id={String(vehicleId)}>
                        <Menu.Button icon={HiSquare2Stack} onClick={handleDuplicate}>
                            Duplicate
                        </Menu.Button>
                        <Modal.Open opens="edit">
                            <Menu.Button icon={HiPencil}>Edit</Menu.Button>
                        </Modal.Open>
                        <Modal.Open opens="delete">
                            <Menu.Button icon={HiTrash}>Delete</Menu.Button>
                        </Modal.Open>
                    </Menu.List>
                </Menu>

                <Modal.Window name="edit">
                    <CreateVehicleForm vehicle={vehicle} />
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        isLoading={isDeleting}
                        disabled={isDeleting}
                        onConfirm={onDelete}
                        resourceName="vehicle"
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
};

export default VehicleRow;
