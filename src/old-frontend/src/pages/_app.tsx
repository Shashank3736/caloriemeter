import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const theme = createTheme({
    palette: {
      mode: mode === 'light' ? 'light' : 'dark',
    }
  });

  function toggleMode() {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    window.localStorage.setItem('mode', newMode);
    document.body.classList.toggle('dark');
  }

  useEffect(() => {
    const localMode = window.localStorage.getItem('mode');
    if (localMode) {
      setMode(localMode);
      if (localMode === 'dark') {
        document.body.classList.add('dark');
      }
    }
  }, [])
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} darkMode={mode} toggleDarkMode={toggleMode} />
        <CssBaseline />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
