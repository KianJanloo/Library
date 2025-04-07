import { useContext } from "react";
import { CartContext } from "@/context/ContextCart";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart باید داخل CartProvider استفاده بشه");
  return context;
};
