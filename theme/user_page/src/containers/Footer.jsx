import React from 'react'
import icon from '../assets/icon.png'
import { SiDiscord, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si'

const IconLink = ({ link, icon, color='text-blue-500' }) => {
    const cn = `ml-3 text-gray-500 hover:${color}`
    return (
        <a className={cn} href={link}>
            {icon}
        </a>
    )
}

const Footer = () => {
  return (
    <footer className='text-gray-600 bottom-0 lg:fixed lg:w-full lg:h-20 lg:bg-white'>
        <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col lg:relative'>
            <div className='flex font-sans font-medium items-center md:justify-start justify-center text-gray-900'>
                <img className='rounded-full w-7' src={icon} alt="logo" />
                <span className='ml-3 text-xl'>Shreyash Raj</span>
            </div>
            <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                © 2023 Shreyash Raj & Team
            </p>
            <div className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
                <IconLink link="https://discord.gg/MurmgRTkDy" icon={<SiDiscord className='w-5 h-5' />} />
                <IconLink link="https://twitter.com/Shashank3736" icon={<SiTwitter className='w-5 h-5' />} />
                <IconLink link="https://www.instagram.com/G8RajShreyash/" icon={<SiInstagram className='w-5 h-5' />} color='text-pink-500' />
                <IconLink link="https://www.linkedin.com/in/shreyash-raj-994b92249/" icon={<SiLinkedin className='w-5 h-5' />} />
            </div>
        </div>
    </footer>
  )
}

export default Footer
