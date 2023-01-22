'use client'
import React from 'react'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar />
    <div className='flex items-center m-5'>
      <p className="underline text-4xl font-bold mr-4">
        Hello World
      </p>
    </div>
    <br />
    <Footer />
    </>
  )
}
