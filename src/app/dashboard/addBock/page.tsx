import AddBookForm from '@/components/AddBookForm'
import React from 'react'

const AddBook = () => {
  return (
    <div className='bg-white mx-auto text-white p-4 rounded-2xl w-[500px] h-fit mt-[100px] flex flex-col gap-4'>
      <h2 className='text-black font-bold text-xl'> Add Book </h2>
      <AddBookForm />
    </div>
  )
}

export default AddBook
