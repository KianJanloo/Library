import UpdateForm from '@/components/UpdateForm'
import React from 'react'

const UpdateBook = () => {
  return (
    <div className='bg-white mx-auto text-white p-4 rounded-2xl w-[500px] h-fit mt-[100px] flex flex-col gap-4'>
      <h2 className='text-black font-bold text-xl'> Update Book </h2>
      <UpdateForm />
    </div>
  )
}

export default UpdateBook
