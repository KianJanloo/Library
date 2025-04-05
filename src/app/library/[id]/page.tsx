import React, { FC } from "react";
import { IBooks } from "@/types/Books-type";
import axios from "axios";

interface IProps {
    params: Promise<{ id: string }>,
}

const BookInfo: FC<IProps> = async ({ params }) => {

  const response = await axios(`http://localhost:8000/Books/${(await params).id}`);
  const book = response.data as IBooks;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={book.image}
          alt={book.name}
          className="w-48 h-64 hover:scale-[1.05] cursor-pointer transition-all duration-300 object-cover rounded-xl shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{book.name}</h2>
        <p className="text-gray-600 text-sm mb-1">{book.author}</p>
        <p className="text-gray-500 text-sm mb-3">{book.describe}</p>
        <span className="text-lg font-semibold text-green-600">
          {book.price}
        </span>
        <button className="bg-green-500 text-white rounded-full px-4 py-1 cursor-pointer mt-2 hover:scale-[1.02] transition-all duration-300"> Add to cart </button>
        <button className="bg-red-500 text-white rounded-full px-4 py-1 cursor-pointer mt-2 hover:scale-[1.02] transition-all duration-300"> Delete </button>
      </div>
    </div>
  );
};

export default BookInfo;
