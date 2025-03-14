import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {createUser, userLogin} from "@/services/apiAuth";
import {AuthRequestDto, LoginResponse, UserDto} from "@/types";

export const useLogin = () => {
    const {isLoading: isLogging, mutate: login} = useMutation<
        LoginResponse,
        Error,
        AuthRequestDto
    >({
        mutationFn: (dto) => userLogin(dto),
        onSuccess: (data) => {
            toast.success(data.message);
            // store the JWT token in localStorage
            localStorage.setItem("jwt_token", data.jwt);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.userId.toString());
        },
        onError: (err: any) => toast.error(err.message),
    });

    return {isLogging, login};
};
