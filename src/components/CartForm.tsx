import React from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  describe: string;
  author: string;
  qty: number;
};

type Props = {
  item: CartItem;
  onRemove: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const CartItemCard = ({ item, onRemove, onIncrease, onDecrease }: Props) => {
  return (
    <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-4 items-center justify-between transition-all hover:shadow-xl">
      <div className="flex-1">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-sm text-gray-400">{item.describe}</p>
        <p className="text-lg text-green-400 mt-2 font-semibold">{item.price.toLocaleString()}$</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.id)}
          className="bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-600"
        >
          -
        </button>
        <span className="text-lg">{item.qty}</span>
        <button
          onClick={() => onIncrease(item.id)}
          className="bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-600"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-400 hover:text-red-500 text-sm mt-2 md:mt-0"
      >
        Delete
      </button>
    </div>
  );
};

export default CartItemCard;
