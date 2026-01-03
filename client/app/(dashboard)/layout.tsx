import React from "react";
import DashboardWrapper from "./dashboardWrapper";
export default function DashBoardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
