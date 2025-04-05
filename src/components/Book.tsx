import { IBooks } from '@/types/Books-type'
import Link from 'next/link'
import React, { FC } from 'react'

const Book: FC<IBooks> = ({ image, name, author, describe, id }) => {
  return (
    <Link key={id} href={`/library/${id}`} className="relative col-span-1 h-[300px] group cursor-pointer">
      <img
        className="bg-white h-full w-full rounded-xl object-cover"
        src={image}
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center p-4">
        <h2 className="text-lg font-bold mb-2"> {name} </h2>
        <p className="text-sm"> {author} </p>
        <p className="text-sm mt-2"> {describe} </p>
      </div>
    </Link>
  )
}

export default Book
