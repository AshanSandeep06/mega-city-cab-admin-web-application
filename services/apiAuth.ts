import axios from "axios";
import Axios from "@/lib/axios/common";
import {AuthRequestDto, LoginResponse, User, UserDto} from "@/types";

// Register a new user
export const createUser = async (dto: UserDto): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>("http://localhost:8080/api/v1/user/register", dto);
        return response.data;
    } catch (error: any) {
        console.error("Error registering user:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to register user");
    }
};

interface UserPasswordDto {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

interface StandardResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Fetch user data by userId
export const fetchUserById = async (userId: number): Promise<User> => {
    try {
        const response = await Axios.get<StandardResponse<User>>("/user", {
            params: { userId },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Failed to fetch user data");
    }
};

// Update user
export const updateUser = async (dto: UserDto): Promise<string> => {
    try {
        const response = await Axios.put<StandardResponse<string>>("/user/update", dto);
        return response.data.data; // Returns the response message (e.g., "Password Updated")
    } catch (error) {
        console.error("Error updating password:", error);
        throw new Error("Failed to update password");
    }
};

export const updateUserPassword = async (dto: UserPasswordDto): Promise<string> => {
    try {
        const response = await Axios.put<StandardResponse<string>>("/user/updateUserPassword", dto);
        return response.data.data; // Returns the response message (e.g., "Password Updated")
    } catch (error) {
        console.error("Error updating password:", error);
        throw new Error("Failed to update password");
    }
};

export const userLogin = async (dto: AuthRequestDto): Promise<StandardResponse<LoginResponse>> => {
    try {
        const response = await axios.post<StandardResponse<LoginResponse>>("http://localhost:8080/api/v1/user/login", dto);
        return response.data;
    } catch (error) {
        console.error("Error user login:", error);
        throw new Error("User Log in failed");
    }
};
