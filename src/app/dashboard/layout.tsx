import NavbarDashboard from "@/components/NavbarDashboard";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-10">
      <NavbarDashboard />
      <div className="mx-auto col-span-9"> {children}</div>
    </div>
  );
};

export default layout;
