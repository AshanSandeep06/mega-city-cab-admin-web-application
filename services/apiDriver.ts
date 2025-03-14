// services/apiDriver.ts
import queryString from "query-string";
import Axios from "@/lib/axios/common";

interface StandardResponse {
    code: number;
    message: string;
    data: any;
}

export interface Driver {
    driverId: number;
    name: string;
    age: number;
    email: string;
    licenseNumber: string;
    contactNumber: string;
    nic: string;
    address: string;
    status: string;
}

export interface DriverDto {
    driverId?: number;
    name: string;
    age: number;
    email: string;
    licenseNumber: string;
    contactNumber: string;
    nic: string;
    address: string;
    status: string;
}

export type DriverCustomResult = DriverDto;

// Get all drivers
export const getAllDrivers = async (query: Record<string, any> = {}): Promise<DriverDto[]> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/driver/allDrivers",
        query,
    });

    try {
        const response = await Axios.get<StandardResponse>(urlWithQuery);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching all drivers:", error.response?.data || error.message);
        throw new Error("Failed to fetch all drivers");
    }
};

// Save a driver
export const saveDriver = async (dto: DriverDto): Promise<Driver> => {
    try {
        const response = await Axios.post<StandardResponse>("/driver/save", dto, {
            headers: {"type": "Admin"}, // Assuming an Admin type for now
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error saving driver:", error.response?.data || error.message);
        throw new Error("Failed to save driver");
    }
};

// Update a driver
export const updateDriver = async (dto: DriverDto): Promise<Driver> => {
    try {
        const response = await Axios.put<StandardResponse>("/driver/update", dto, {
            headers: {"type": "Admin"},
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating driver:", error.response?.data || error.message);
        throw new Error("Failed to update driver");
    }
};

// Delete a driver
export const deleteDriver = async (driverId: number): Promise<Driver> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/driver",
        query: {driverId},
    });
    try {
        const response = await Axios.delete<StandardResponse>(urlWithQuery);
        return response.data.data;
    } catch (error: any) {
        console.error("Error deleting driver:", error.response?.data || error.message);
        throw new Error("Failed to delete driver");
    }
};

// Get driver by ID
export const getDriverById = async (driverId: number): Promise<Driver> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/driver",
        query: {driverId},
    });
    try {
        const response = await Axios.get<StandardResponse>(urlWithQuery, {
            headers: {"type": "Admin"},
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching driver by ID:", error.response?.data || error.message);
        throw new Error("Failed to fetch driver by ID");
    }
};

// Get driver by email
export const getDriverByEmail = async (email: string): Promise<Driver> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/driver",
        query: {email},
    });
    try {
        const response = await Axios.get<StandardResponse>(urlWithQuery);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching driver by email:", error.response?.data || error.message);
        throw new Error("Failed to fetch driver by email");
    }
};

// Get random driver
export const getRandomDriver = async (): Promise<Driver> => {
    try {
        const response = await Axios.get<StandardResponse>("/driver/getDriver", {
            headers: {"type": "User"}, // Assuming User type for random driver
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching random driver:", error.response?.data || error.message);
        throw new Error("Failed to fetch random driver");
    }
};

// Get driver count
export const getDriverCount = async (): Promise<number> => {
    try {
        const response = await Axios.get<StandardResponse>("/driver/count", {
            headers: {"type": "Admin"},
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching driver count:", error.response?.data || error.message);
        throw new Error("Failed to fetch driver count");
    }
};

// Change driver status to Busy
export const changeDriverStatus = async (driverId: number): Promise<boolean> => {
    try {
        const response = await Axios.post<StandardResponse>(
            `/driver/changeStatus?driverId=${driverId}`,
            null,
            {headers: {"type": "Admin"}}
        );
        return response.data.data;
    } catch (error: any) {
        console.error("Error changing driver status:", error.response?.data || error.message);
        throw new Error("Failed to change driver status");
    }
};

// Update driver status to Available
export const updateDriverStatus = async (driverId: number): Promise<boolean> => {
    try {
        const response = await Axios.post<StandardResponse>(
            `/driver/updateStatus?driverId=${driverId}`,
            null,
            {headers: {"type": "Admin"}}
        );
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating driver status:", error.response?.data || error.message);
        throw new Error("Failed to update driver status");
    }
}
