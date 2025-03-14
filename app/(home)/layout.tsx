"use client"
import React, {useEffect} from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import "react-loading-skeleton/dist/skeleton.css";
import {useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const isTokenExpired = (token: string | null): boolean => {
        if (!token) return true;

        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        const currentPath = router.pathname;
        console.log("TOKEN: "+token)

        // Avoid redirect loops
        if (currentPath === "/dashboard" || currentPath === "/login") return;

        if (token && !isTokenExpired(token)) {
            router.push("/dashboard");
        } else {
            // Clear localStorage if token is expired or missing
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("userName");
            router.push("/login");
        }
    }, [router, router.pathname]); // Re-run when route changes


  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900 pt-8 px-10 pb-12 overflow-x-auto">
        <div className="container flex flex-col gap-6">
        {children}
          </div>
      </main>
    </div>
  );
};

export default Layout;
