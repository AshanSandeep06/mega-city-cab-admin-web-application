import queryString from "query-string";
import Axios from "@/lib/axios/common";

// export const getVehicles = async () => {
//   try {
//     // const { data } = await axios.get("/api/vehicle");
//     return [
//       {
//         vehicleId: 1,
//         plateNumber: "ABC123",
//         passengerCount: 4,
//         pricePerKm: 2.5,
//         vehicleModel: "Toyota Corolla",
//         status: "Available",
//         image: "/logo-dark.png",
//         category: "Sedan",
//       },
//       {
//         vehicleId: 2,
//         plateNumber: "DEF456",
//         passengerCount: 2,
//         pricePerKm: 3.0,
//         vehicleModel: "Honda Civic",
//         status: "Unavailable",
//         image: "/logo-dark.png",
//         category: "Coupe",
//       },
//       {
//         vehicleId: 3,
//         plateNumber: "GHI789",
//         passengerCount: 6,
//         pricePerKm: 4.0,
//         vehicleModel: "Ford Transit",
//         status: "Available",
//         image: "/logo-dark.png",
//         category: "Van",
//       },
//       {
//         vehicleId: 4,
//         plateNumber: "JKL012",
//         passengerCount: 8,
//         pricePerKm: 5.0,
//         vehicleModel: "Mercedes Sprinter",
//         status: "Maintenance",
//         image: "/logo-dark.png",
//         category: "Minibus",
//       },
//     ];
//   } catch (error) {
//     throw new Error("failed to fetch cabins");
//   }
// };
//
// export const deleteVehicle = async (id: string) => {
//   try {
//     const { data } = await axios.delete(`/api/v1/vehicle/${id}`);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
//
// export const createEditVehicle = async ({
//   id,
//   description,
//   discount,
//   image,
//   maxCapacity,
//   name,
//   regularPrice,
// }: {
//   id?: string;
//   description: string;
//   discount: number;
//   image: File | string;
//   maxCapacity: number;
//   name: string;
//   regularPrice: number;
// }) => {
//   try {
//     let imageUrl = image;
//     if (typeof image !== "string") {
//       imageUrl = await uploadImage(image);
//     }
//
//     const payload = {
//       description,
//         discount: discount * 1,
//         image: imageUrl,
//         maxCapacity: maxCapacity * 1,
//         name,
//         regularPrice: regularPrice * 1,
//     };
//
//     if (!id) {
//       const { data } = await axios.post(`/api/v1/vehicle/save`, payload);
//       return data;
//     }
//
//     const { data } = await axios.patch(`/api/v1/vehicle/${id}`, payload);
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };


// ------------------------------------------------------------------------------------------------------------

interface StandardResponse {
    code: number;
    message: string;
    data: any;
}

export interface Vehicle {
    vehicleId: number;
    plateNumber: string;
    passengerCount: number;
    pricePerKm: number;
    vehicleModel: string;
    status: string;
    image: string;
    category: string;
}

export interface VehicleCustomResult {
    vehicleId: number;
    plateNumber: string;
    passengerCount: number;
    pricePerKm: number;
    model: string;
    vehicleStatus: string;
    image: string;
    category: string;
    categoryStatus: string;
}

export interface VehicleDto {
    vehicleId?: number;
    plateNumber: string;
    passengerCount: number;
    pricePerKm: number;
    vehicleModel: string;
    status: string;
    image?: string;
    category: string;
}

// Get all vehicles with category
export const getAllVehiclesWithCategory = async (
    query: Record<string, any> = {}
): Promise<VehicleCustomResult[]> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/vehicle/allVehicales/with/category",
        query,
    });
    try {
        const response = await Axios.get<StandardResponse>(urlWithQuery);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching vehicles with category:", error.response?.data || error.message);
        throw new Error("Failed to fetch vehicles with category");
    }
};

// Save a vehicle
export const saveVehicle = async (dto: VehicleDto, imageFile: File): Promise<Vehicle> => {
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    formData.append("imageFile", imageFile);
    try {
        const response = await Axios.post<StandardResponse>("/vehicle/save", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error saving vehicle:", error.response?.data || error.message);
        throw new Error("Failed to save vehicle");
    }
};

// Update a vehicle
export const updateVehicle = async (dto: VehicleDto, imageFile: File): Promise<Vehicle> => {
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    formData.append("imageFile", imageFile); // Always requires a file
    try {
        const response = await Axios.put<StandardResponse>("/vehicle/update", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating vehicle:", error.response?.data || error.message);
        throw new Error("Failed to update vehicle");
    }
};

// Delete a vehicle
export const deleteVehicle = async (vehicleId: number): Promise<void> => {
    const urlWithQuery = queryString.stringifyUrl({
        url: "/vehicle",
        query: { vehicleId },
    });
    try {
        const response = await Axios.delete<StandardResponse>(urlWithQuery);
        return response.data.data;
    } catch (error: any) {
        console.error("Error deleting vehicle:", error.response?.data || error.message);
        throw new Error("Failed to delete vehicle");
    }
};
















