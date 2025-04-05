import Book from '@/components/Book'
import { IBooks } from '@/types/Books-type'
import axios from 'axios'
import React from 'react'

const BookList = async () => {
    
  const response = await axios('http://localhost:8000/Books');
  const books = response.data as IBooks[];

  return (
    <div className='p-4 flex gap-4 flex-col'>
      <div className='grid grid-cols-6 gap-4'>
        {books.map((item, index) => (
            <Book key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default BookList
