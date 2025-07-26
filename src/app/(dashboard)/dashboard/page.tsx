"use client";

import React from "react";
import { SystemAdminDashboard } from "./_ui/SystemAdminDashboard";
import { FinanceOfficerDashboard } from "./_ui/FinanceOfficerDashbaord";
import { DepartmentHeadDashboard } from "./_ui/DepartmentHeadDashboard";
import { useUserStore } from "@/store/user";

export default function Page() {
  const { user } = useUserStore();
  const renderDashboard = () => {
    if (!user) return null;

    // console.log("user", user);

    switch (user.role) {
      case "system_admin":
        return <SystemAdminDashboard />;
      case "finance_officer":
        return <FinanceOfficerDashboard />;
      case "department_head":
        return <DepartmentHeadDashboard />;
      default:
        return <div>Dashboard not found</div>;
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">{renderDashboard()}</main>
    </div>
  );
}
