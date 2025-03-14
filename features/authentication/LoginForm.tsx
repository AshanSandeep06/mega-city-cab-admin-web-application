// LoginForm.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Input from "@/components/Input";
import { SpinnerMini } from "@/components/Loader";
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import { useLogin } from "@/features/authentication/hooks/useLogin";

interface AuthRequestDto {
  email: string;
  password: string;
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

const LoginForm = () => {
  const { login, isLogging } = useLogin(); // Use the hook at the top level
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequestDto>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthRequestDto> = (data) => {
    login(data, {
      onSuccess: (response: LoginResponse) => {
        if (response.code !== 200) {
          toast.error(response.message || "Login failed");
          return;
        }

        if (response.jwt) {
          // Store relevant data in localStorage
          localStorage.setItem("jwt_token", response.jwt);
          localStorage.setItem("userId", response.userId.toString());
          localStorage.setItem("role", response.role);
          localStorage.setItem("userName", response.userName);

          router.push("/dashboard");
        } else {
          toast.error("No JWT token received from server");
        }
      },
      onError: (error: Error) => {
        toast.error(error.message || "An error occurred during login");
      },
    });
  };

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[14px] py-[22px] px-8 bg-white dark:bg-black border dark:border-gray-800 border-gray-100 dark:border-gray-800 rounded-md"
      >
        <FormRow
            label="Email address"
            isVertical
            id="email"
            error={errors.email?.message}
        >
          <Input
              type="email"
              id="email"
              autoComplete="username"
              disabled={isLogging}
              className="w-full"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
          />
        </FormRow>

        <FormRow
            label="Password"
            isVertical
            id="password"
            error={errors.password?.message}
        >
          <Input
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isLogging}
              className="w-full"
              {...register("password", {
                required: "This field is required",
              })}
          />
        </FormRow>

        <FormRow isVertical>
          <Button
              type="submit"
              disabled={isLogging}
              className="w-full cursor-pointer disabled:cursor-default flex items-center justify-center gap-2"
          >
            {isLogging && <SpinnerMini />}
            <span>Log in</span>
          </Button>
        </FormRow>
      </form>
  );
};

export default LoginForm;
