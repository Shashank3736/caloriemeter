'use client'
import './globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(localStorage.getItem('mode') || (prefersDarkMode ? 'dark' : 'light'))
  useEffect(() => {
    if(mode === 'dark') {
      document.body.classList.add('dark')
    }
    window.addEventListener('storage', (e) => {
      if (e.key === 'mode') {
        if (e.newValue === 'light') {
          setMode('light')
          document.body.classList.remove('dark')
        } else if (e.newValue === 'dark') {
          setMode('dark')
          document.body.classList.add('dark')
        } else {
          if(prefersDarkMode) {
            setMode('dark')
            document.body.classList.add('dark')
          } else {
            setMode('light')
            document.body.classList.remove('dark')
          }
        }
      }
    })
    return () => {
      window.removeEventListener('storage', () => {})
    }
  }, [prefersDarkMode, mode])
  const theme = createTheme({
    palette: {
      mode: mode === 'light' ? 'light' : 'dark',
    },
  })
  return (
    <html lang="en">
      <head />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <body>
            {children}
          </body>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  )
}
