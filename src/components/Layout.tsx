import React from "react";
import Navbar from "./Navbar";
import { CartProvider } from "@/context/ContextCart";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <div>
      <Navbar />
      <CartProvider>{children}</CartProvider>
    </div>
  );
};

export default Layout;
