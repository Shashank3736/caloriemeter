'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { Home, Login, Logout, Settings, Today } from '@mui/icons-material'
import { get_user } from '@/utils/api'
import { Avatar, Divider, FormControlLabel, ListItemIcon, Menu, MenuItem, Switch } from '@mui/material'

const name = 'Shreyash Raj'
const links = [
    {
        name: 'Home',
        href: '/',
        icon: <Home />
    }
]

const Navbar = ({darkMode, toggleDarkMode}: {darkMode: 'light' | 'dark', toggleDarkMode: () => void}) => {
    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('mode')
        window.location.reload()
        setUser(null)
    };
    useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (!token || !id) return
        get_user({ token, id }).then((user) => {
            setUser(user)
        })
    }, [])
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
                    {(user === null) ? <Button className='ml-5' variant='contained' href='/accounts/login' startIcon={<Login />}>Login</Button>:
                    <>
                    <Tooltip title='Profile'>
                        <IconButton 
                        onClick={handleClick}
                        size='small'
                        className='ml-5'
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                            <Avatar sx={{ width: 32, height: 32}}>{user.username[0].toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem className='flex items-center justify-center'>
                            User: {user.username}
                        </MenuItem>
                        <MenuItem onClick={(e) => {
                            toggleDarkMode();
                            e.stopPropagation();
                        }}>
                            <FormControlLabel
                            value='darkMode'
                            control={<Switch checked={darkMode === 'dark'} onChange={toggleDarkMode} />}
                            label='Dark Mode'
                            labelPlacement='start'
                            />
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => window.location.replace('/me/today/')}>
                            <ListItemIcon>
                                <Today fontSize="small" />
                            </ListItemIcon>
                            Today
                        </MenuItem>
                        <MenuItem onClick={() => window.location.replace('/me/settings/')}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                    </>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar