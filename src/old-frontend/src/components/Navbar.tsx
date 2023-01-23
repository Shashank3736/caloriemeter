import Image from 'next/image'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { DarkMode, Home, LightMode, Login, SettingsBrightness } from '@mui/icons-material'

const name = 'Shreyash Raj'
const links = [
    {
        name: 'Home',
        href: '/',
        icon: <Home />
    }
]

const Navbar = ({darkMode, toggleDarkMode}: {darkMode: 'light' | 'dark', toggleDarkMode: () => void}) => {
    return (
        <header>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex items-center dark:text-white text-gray-900 mb-4 md:mb-0">
                    <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                    <span className="ml-3 font-semibold text-2xl">{name}</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {links.map((link) => {
                        return (
                            <Button color='inherit' href={link.href} key={link.name} startIcon={link.icon}>{link.name}</Button>
                        )
                    })}
                    <Button className='ml-5' variant='contained' href='/accounts/login' startIcon={<Login />}>Login</Button>
                    <Tooltip title={darkMode.toUpperCase()}>
                        <IconButton onClick={toggleDarkMode} className='ml-5'>
                            {darkMode === 'light' ? <DarkMode /> : <LightMode />}
                        </IconButton>
                    </Tooltip>
                </nav>
            </div>
        </header>
    )
}

export default Navbar