import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { check_status } from "@/utils/api";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import { useEffect, useState } from "react";

type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
    children: React.ReactNode
}

export default function MainLayout({ children, darkMode, toggleDarkMode }: Props) {
    const [api, setApi] = useState(true)
    useEffect(() => {
        console.log('Checking API status')
        check_status()
        .catch(() => {
            setApi(false);
            setInterval(() => {
                check_status()
                .then(() => {
                    window.location.reload()
                })
                console.log('API is down')
            }, 5000)
        })
    }, [])
    if(!api) {
        return (
            <section className="flex flex-col items-center justify-center h-screen">
                <Container className='flex flex-row justify-center items-center py-12'>
                    <Typography variant='h3' fontWeight={600}>
                        Sorry for the inconvenience, but the API is currently down. Please try again later.
                    </Typography>
                    <img src="/disconnected.svg" className="max-w-[700px]" alt='disconnected' />
                </Container>
            </section>
        )
    }
    return ( 
        <>
        <Head>
            <title>Caloriemeter</title>
            <meta name="description" content="Track your calorie, track your progress." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.ico" />
        </Head>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {children}
        <Footer />
        </>
    )
}