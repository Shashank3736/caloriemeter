import Image from 'next/image'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material'
import { SiDiscord } from 'react-icons/si'
import Link from 'next/link'

const name = 'Shreyash Raj'

const Footer = () => {
  return (
    <footer className=''>
        <div className="container px-5 mx-auto flex items-center sm:flex-row flex-col">
            <Link className='flex font-medium items-center md:justify-start justify-center no-underline text-gray-900 dark:text-white' href="/">
                <Image src="/icon.ico" alt="Logo" className='rounded-full' width={32} height={32} />
                <span className="ml-3 text-xl">{name}</span>
            </Link>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:border-solid border-0 sm:border-l-2 sm:border-gray-200 mt-4">© {new Date().getFullYear()} Caloriemeter —
                <a href="https://twitter.com/Shashank3736" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Shashank3736</a>
            </p>
            <div className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
                <IconButton href='https://twitter.com/Shashank3736' target="_blank">
                    <Twitter />
                </IconButton>
                <IconButton href='https://github.com/Shashank3736' target='_blank'>
                    <GitHub />
                </IconButton>
                <IconButton target='_blank' href='https://discord.gg/WJMsJ3kcRb'>
                    <SiDiscord />
                </IconButton>
                <IconButton href='https://www.linkedin.com/in/shreyash-raj-994b92249/' target="_blank">
                    <LinkedIn />
                </IconButton>
            </div>
        </div>
    </footer>
  )
}

export default Footer