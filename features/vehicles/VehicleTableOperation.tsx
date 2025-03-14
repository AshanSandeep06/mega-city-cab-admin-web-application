// features/vehicles/VehicleTableOperation.tsx
"use client";
import React from "react";

import Filter from "@/components/Filter";
import { statusFilterOptions } from "@/utils/constants";

const VehicleTableOperation = () => {
    return (
        <div className="flex items-center gap-4">
            <Filter options={statusFilterOptions} filterField="status" />
        </div>
    );
};

export default VehicleTableOperation;
