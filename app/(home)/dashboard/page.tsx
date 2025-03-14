import React from "react";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-gray-800 dark:text-gray-100 font-semibold text-[24px]">Dashboard</h1>
      </div>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
