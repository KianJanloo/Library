'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonDeleteBook = ({ id }: { id: string }) => {

  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/Books/${id}`);
      router.push('/library')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white rounded-full px-4 py-1 cursor-pointer mt-2 hover:scale-[1.02] transition-all duration-300"
    >
      {" "}
      Delete{" "}
    </button>
  );
};

export default ButtonDeleteBook;
