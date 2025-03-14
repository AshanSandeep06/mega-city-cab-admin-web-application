import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {updateUser, updateUserPassword} from "@/services/apiAuth";

export const useUpdateUser = () => {
  const { mutate: editUser, isLoading:isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Account successfully updated!");
    },
  });

  return { editUser, isUpdating };
};

export const useUpdatePassword = () => {
  const { mutate: editUserPassword, isLoading:isUpdating } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success("Account successfully updated!");
    },
  });

  return { editUserPassword, isUpdating };
};
