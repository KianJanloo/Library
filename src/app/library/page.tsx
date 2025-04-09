'use client'
import Book from '@/components/Book'
import { IBooks } from '@/types/Books-type'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BookList = () => {
    
  const [books, setBooks] = useState<IBooks[]>([])

  const fetchBooks = async () => {
    const response = await axios(`/api/posts`);
    const books = response.data as IBooks[];
    setBooks(books)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

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
