'use client'
import AccountsLayout from "@/layout/AccountLayout";
import { get_token } from "@/utils/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Tooltip, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";

export default function LoginPage() {
    const [state, setState] = useState({
        username: '',
        password: '',
        show_password: false,
        wrong_attempts: 0,
        is_authenticated: false,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setState({
            ...state,
            [event.target.id]: event.target.value,
        });
    }

    function toggleShowPassword() {
        setState({
            ...state,
            show_password: !state.show_password,
        });
    }

    function isAllowed() {
        return state.username.length > 0 && state.password.length >= 8;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        get_token({ username: state.username, password: state.password}).then((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.user_id);
            setState({ ...state, is_authenticated: true });
        }).catch((err) => {
            setState({
                ...state,
                wrong_attempts: state.wrong_attempts + 1,
            });
        })
    }

    useEffect(() => {
        if(state.is_authenticated) window.location.replace('/')
        if(localStorage.getItem('token') && localStorage.getItem('id')) window.location.replace('/')
    }, [state.is_authenticated])

    if(state.is_authenticated) window.location.replace('/')
    
    return (
        <AccountsLayout>
            <Paper className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[350px] min-h-[350px] w-1/2 p-5 md:rounded'>
                <Typography variant='h5' fontWeight='bold' className='text-center'>Welcome Back!</Typography>
                <Box component='form' className='flex flex-col w-full p-4' autoComplete='off' gap={3} onSubmit={handleSubmit}>
                    <TextField required id='username' label='Username' variant='standard' className='w-full' onChange={handleChange} />
                    <FormControl required className='w-full' variant='standard'>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <Input id='password'
                        type={state.show_password ? 'text' : 'password'} 
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <Tooltip title='Show Password'>
                                    <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
                                        {state.show_password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    <Box className='w-full'>
                        {isAllowed() ?
                        <Button className='w-full' variant='contained' type='submit'>Login</Button>:
                        <Tooltip title='Username and Password must not be empty. Password must be at least 8 characters long' placement='bottom'>
                            <span className='cursor-not-allowed'>
                                <Button className='w-full' variant='contained' type='submit' disabled={true}>Login</Button>
                            </span>
                        </Tooltip>
                        }
                        <Typography className='mt-1' variant='body1'>Need an account? <Link href='/accounts/register'>Register Here</Link></Typography>
                    </Box>
                </Box>
                {state.wrong_attempts > 0 && <Typography className='text-center' variant='body1' color='error'>Wrong Username or Password</Typography>}
            </Paper>
        </AccountsLayout>
    );
}