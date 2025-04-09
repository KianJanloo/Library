"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ButtonDeleteBook = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts`, {
        data: {
          id: id,
        },
      });
      router.push("/library");
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
