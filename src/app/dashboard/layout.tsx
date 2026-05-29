import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar />
      <main>{children}</main>
      {/* main body of tha dashobard */}
    </div>
  );
};

export default DashboardLayout;
