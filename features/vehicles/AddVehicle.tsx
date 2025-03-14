// "use client";
// import React from "react";
// import Button from "@/components/Button";
// import CreateCabinForm from "./CreateVehicleForm";
// import Modal from "@/components/Modal";
//
// const AddVehicle = () => {
//   return (
//     <Modal>
//       <Modal.Open opens="cabin-form">
//         <Button className="max-w-fit ml-auto">Add new vehicle</Button>
//       </Modal.Open>
//       <Modal.Window name="cabin-form">
//         <CreateCabinForm />
//       </Modal.Window>
//     </Modal>
//   );
// };
//
// export default AddVehicle;


// ------------------------------------------------------------------------------------------------

// features/vehicles/AddVehicle.tsx
"use client";
import React from "react";
import Button from "@/components/Button";
import CreateVehicleForm from "./CreateVehicleForm";
import Modal from "@/components/Modal";

const AddVehicle = () => {
    return (
        <Modal>
            <Modal.Open opens="vehicle-form">
                <Button className="max-w-fit ml-auto">Add new vehicle</Button>
            </Modal.Open>
            <Modal.Window name="vehicle-form">
                <CreateVehicleForm />
            </Modal.Window>
        </Modal>
    );
};

export default AddVehicle;
