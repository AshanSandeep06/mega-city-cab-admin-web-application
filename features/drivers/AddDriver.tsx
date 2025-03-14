// features/drivers/AddDriver.tsx
"use client";
import React from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import CreateDriverForm from "./CreateDriverForm";

const AddDriver = () => {
    return (
        <Modal>
            <Modal.Open opens="vehicle-form">
                <Button className="max-w-fit ml-auto">Add new driver</Button>
            </Modal.Open>
            <Modal.Window name="vehicle-form">
                <CreateDriverForm />
            </Modal.Window>
        </Modal>
    );
};

export default AddDriver;
