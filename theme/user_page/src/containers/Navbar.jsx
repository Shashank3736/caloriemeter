import React from 'react'
import { HiArrowCircleRight } from 'react-icons/hi'

const NavP = ({ name, link }) => {
    return (
        <a href={link} className="mr-5 text-white hover:underline cursor-pointer">{name}</a>
    )
}

const Navbar = ({ name }) => {
  return (
    <div className='bg-slate-800 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <p className='text-white text-xl font-sans items-center justify-center mb-4 md:mb-0 ml-3 cursor-default font-semibold'>Hello {name}</p>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <NavP name='Home' link='/' />
            <NavP name='Feeds' link='/feeds' />
            <NavP name='Profile' link='/profile' />
        </nav>
        <button className='text-white flex flex-row hover:bg-white hover:text-slate-800 text-xl px-2 py-1 rounded' type="submit">
            Logout <HiArrowCircleRight className='items-center justify-center my-auto mx-2'/>
        </button>
    </div>
  )
}

export default Navbar