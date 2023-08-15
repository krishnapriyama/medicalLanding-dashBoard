import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex items-center mx-auto'>
          <span className='text-2xl font-extrabold'>
            Welcome
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
