import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <img src={assets.logo} alt="logo" className='w-36' />
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <li>Home</li>
        <li>Product</li>
        <li>About</li>
        <li>Collection</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}

export default Navbar
