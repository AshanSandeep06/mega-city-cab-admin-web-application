import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {createUser} from "@/services/apiAuth";
import {LoginResponse, UserDto} from "@/types";
import Cookies from "js-cookie";

export const useRegister = () => {
    const {isLoading: isRegistering, mutate: register} = useMutation<
        LoginResponse,
        Error,
        UserDto
    >({
        mutationFn: (dto) => createUser(dto),
        onSuccess: (data) => {
            toast.success(data.message);
            // store the JWT token in localStorage
            localStorage.setItem("jwt_token", data.jwt);
            localStorage.setItem("userId", data.userId.toString());
            localStorage.setItem("role", data.role);
            localStorage.setItem("userName", data.userName);
        },
        onError: (err: any) => toast.error(err.message),
    });

    return {isRegistering, register};
};
