// features/drivers/DriverRow.tsx
"use client";
import React from "react";
import Image from "next/image";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "@/components/ConfirmDelete";
import CreateDriverForm from "./CreateDriverForm";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Menu from "@/components/Menu";

import { useDeleteDriver } from "./hooks/useDeleteDriver";
import { Driver } from "@/types";
import {Button} from "@mui/material";

interface DriverRowProps {
    driver: Driver;
}

const DriverRow: React.FC<DriverRowProps> = ({ driver }) => {
    const { isDeleting, deleteDriver } = useDeleteDriver();

    return (
        <Table.Row>
            <div>{driver.driverId}</div>
            <div>{driver.name}</div>
            <div>{driver.age}</div>
            <div>{driver.email}</div>
            <div>{driver.status}</div>
            <div>
                <Modal>
                    <Modal.Open opens="edit-driver">
                        <Button>
                            <HiPencil />
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="edit-driver">
                        <CreateDriverForm driver={driver} onCloseModal={() => {}} />
                    </Modal.Window>
                </Modal>
                <Modal>
                    <Modal.Open opens="delete-driver">
                        <Button>
                            <HiTrash />
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="delete-driver">
                        <ConfirmDelete
                            resourceName={driver.name}
                            onConfirm={() => deleteDriver(driver.driverId)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
};

export default DriverRow;
