'use client'

import React from "react";
import { useCart } from "@/context/useCart";
import CartForm from "@/components/CartForm";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="p-6 space-y-4 bg-[#121212] min-h-screen">
      <h1 className="text-3xl text-white font-bold mb-4"> Cart </h1>
      {cart.length === 0 ? (
        <p className="text-gray-400"> Your cart is empty! </p>
      ) : (
        cart.map((item) => (
          <CartForm
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
