'use client'
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

export default function RegisterPage() {
  const [state, setState] = useState({
    username: '',
    password_1: '',
    password_2: '',
    email: '',
    show_password: false,
    is_authenticated: false
  })
  const handleChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    if (event) {
      setState({
        ...state,
        [event.target.id]: event.target.value
      })
    }
  }

  function toggleShowPassword() {
    setState({
      ...state,
      show_password: !state.show_password
    })
  }

  function isAllowed() {
    return state.username.length > 0 && state.password_1 === state.password_2 && state.email.length > 0
  }

  function isDiffPass() {
    return state.password_1 !== state.password_2
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
  }
  return (
    <Paper className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[350px] min-h-[350px] w-1/2 p-5 md:rounded'>
      <Typography variant='h5' fontWeight={400} className='text-center'>Welcome Buddy!</Typography>
      <Box component='form' method='post' className='flex flex-col w-full p-4' gap={3} onChange={handleChange} onSubmit={handleSubmit}>
        <TextField required id='username' label='Username' variant='standard' className='w-full' autoComplete='off' />
        <TextField required id='email' label='Email' variant='standard' className='w-full' autoComplete='off' />
        <Box className='flex flex-col md:flex-row' columnGap={1} rowGap={3}>
          <FormControl required className='w-full' variant='standard'>
            <InputLabel htmlFor='password_1'>Password</InputLabel>
            <Input required id='password_1'
            type={state.show_password ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
                      {state.show_password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              />
          </FormControl>
          <TextField required id='password_2' label='Confirm Password' variant='standard' className='w-full' type='password' autoComplete='off' error={isDiffPass()} />
        </Box>
        
        <div>
            <Button className='w-full' variant='contained' type='submit' disabled={!isAllowed()}>Register</Button>
            <Typography className='mt-1' variant='body1'>Already have an account? <Link href='/accounts/login'>Login Here</Link></Typography>
        </div>
    </Box>
    </Paper>
  );
}