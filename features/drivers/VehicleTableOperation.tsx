// features/vehicles/VehicleTableOperation.tsx
"use client";
import React from "react";

import Filter from "@/components/Filter";
import {driverFilterOptions} from "@/utils/constants";

const VehicleTableOperation = () => {
    return (
        <div className="flex items-center gap-4">
            <Filter options={driverFilterOptions} filterField="status" />
        </div>
    );
};

export default VehicleTableOperation;
