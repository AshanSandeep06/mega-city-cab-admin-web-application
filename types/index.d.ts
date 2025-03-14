import { IconType } from "react-icons/lib";

export interface INavLink {
    label: string,
    icon: IconType,
    pathname: string,
    id: string
}

export type ExtendedBooking = Booking & {
    guest: {
      fullName: string;
      email: string;
      country: string;
      countryFlag: string;
      nationalID: string;
      nationality: string;
    };
    cabin: {
      name: string;
    };
  };

// types/index.ts
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

export interface UserDto {
    id?: number;
    username: string;
    password: string;
    contactNumber: string;
    email: string;
    address: string;
    nic: string;
    status: string;
    role: string;
}

export interface LoginResponse {
    code: number;
    userName: string;
    message: string;
    role: string;
    jwt: string;
    userId: number;
    email: string;
}

interface User {
    id?: number;
    username: string;
    password: string;
    contactNumber: string;
    email: string;
    address: string;
    nic: string;
    status: string;
    role: string
}

interface LoginResponse {
    code: number;
    userName: string;
    message: string;
    role: string;
    jwt: string;
    userId: number;
    email: string;
}

interface AuthRequestDto {
    email: string;
    password: string;
}
