'use client'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState('light');
  const theme = createTheme({
    palette: {
      mode: mode === 'light' ? 'light' : 'dark',
      ...(mode === 'light' ? {} : {
        background: {
          default: '#23272a',
          paper: '#2c2f33',
        }
      })
    }
  });

  function toggleMode() {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    window.localStorage.setItem('mode', newMode);
    console.log('toggleMode line 23')
    if(newMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  useEffect(() => {
    const localMode = window.localStorage.getItem('mode');
    if (localMode) {
      setMode(localMode);
      if (localMode === 'dark') {
        document.body.classList.add('dark');
      }
    } else if (prefersDarkMode) {
      setMode('dark');
      document.body.classList.add('dark');
    }
  }, [prefersDarkMode])
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} darkMode={mode} toggleDarkMode={toggleMode} />
        <CssBaseline />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
