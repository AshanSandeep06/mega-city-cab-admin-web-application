import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {createUser} from "@/services/apiAuth";
import {LoginResponse, UserDto} from "@/types";

export const useCreateUser = () => {
    const {isLoading: isRegistering, mutate: register} = useMutation<
        LoginResponse,
        Error,
        UserDto
    >({
        mutationFn: (dto) => createUser(dto),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (err: any) => toast.error(err.message),
    });

    return {isRegistering, register};
};
