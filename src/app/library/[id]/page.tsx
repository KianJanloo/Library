'use client'
import React, { useEffect, useState } from "react";
import { IBooks } from "@/types/Books-type";
import axios from "axios";
import ButtonDeleteBook from "@/components/ButtonDeleteBook";
import ButtonAddToCart from "@/components/ButtonAddToCart";
import { useParams } from "next/navigation";

const BookInfo = () => {
  
  const params = useParams();
  const { id } = params;
  const [book, setBook] = useState<IBooks>()

  const fetchBooks = async () => {
    const response = await axios(`/api/posts?id=${id}`);
    const book = response.data;
    setBook(book)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={book?.image}
          alt={book?.name}
          className="w-48 h-64 hover:scale-[1.05] cursor-pointer transition-all duration-300 object-cover rounded-xl shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{book?.name}</h2>
        <p className="text-gray-500 text-sm mb-3">{book?.describe}</p>
        <span className="text-lg font-semibold text-green-600">
          {book?.price}
        </span>
        {book && <ButtonAddToCart book={book} />}
        <ButtonDeleteBook />
      </div>
    </div>
  );
};

export default BookInfo;
