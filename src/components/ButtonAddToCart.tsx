'use client'
import { useCart } from "@/context/useCart";
import { IBooks } from "@/types/Books-type";
import React from "react";

const ButtonAddToCart = ({ book }: { book: IBooks }) => {
  const { addToCart } = useCart()

  return (
    <button onClick={() => addToCart({
        id: Number(book.id),
        name: book.name,
        price: book.price,
        author: book.author,
        describe: book.describe
    })} className="bg-green-500 text-white rounded-full px-4 py-1 cursor-pointer mt-2 hover:scale-[1.02] transition-all duration-300">
      {" "}
      Add to cart{" "}
    </button>
  );
};

export default ButtonAddToCart;
