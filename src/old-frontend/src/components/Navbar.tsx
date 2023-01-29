'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { Close, Home, Login, Logout, Settings, Today } from '@mui/icons-material'
import { User, get_user, update_user } from '@/utils/api'
import { Avatar, Box, Card, Divider, FormControlLabel, FormGroup, Input, ListItemIcon, Menu, MenuItem, Modal, Switch, TextField, Typography } from '@mui/material'

const name = 'Shreyash Raj'
const links = [
    {
        name: 'Home',
        href: '/',
        icon: <Home />
    }, {
        name: 'Today',
        href: '/me/today',
        icon: <Today />
    }
]

interface UpdateUser {
    username: string;
    email: string | null;
    max_calories: number | null;
    profile: File | null
    password: string | null
}

const Navbar = ({darkMode, toggleDarkMode}: {darkMode: 'light' | 'dark', toggleDarkMode: () => void}) => {
    const [user, setUser] = useState<User | null>(null)
    const [updateUser, setUpdateUser] = useState<UpdateUser>({
        username: '',
        email: '',
        password: '',
        max_calories: 0,
        profile: null,
    })
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [edited, setEdited] = useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        if(edited) window.location.reload()
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('mode')
        window.location.reload()
        setUser(null)
    };

    const submit = () => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (!token || !id || !user) return
        console.log(updateUser)
        update_user({ ...updateUser, token, id })
        .then((res) => {
            updateUser.profile = null
            setUpdateUser({ ...updateUser,...res});
            setUser(res);
            setEdited(true)
        }).catch((err: any) => {
            console.log(err)
        })
      }
      
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.type === 'file' && event.target.files) {
            setUpdateUser({ ...updateUser, [event.target.id]: event.target.files[0] })
        }
        else {
            setUpdateUser({ ...updateUser, [event.target.id]: event.target.value })
        }
      }
    useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (!token || !id) return
        get_user({ token, id }).then((res) => {
            setUser(res);
            setUpdateUser({ ...updateUser,...res, profile: null});
        })
        .catch((err: any) => {
            if(err) {
                localStorage.removeItem('token')
                localStorage.removeItem('id')
                window.location.reload()
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <header>
            <div className="container px-4 mx-auto flex justify-between items-center">
                <a className="flex items-center text-black dark:text-white mb-4 md:mb-0 no-underline" href='/'>
                    <Image src="/icon.ico" alt="Logo" className='rounded-full' width={32} height={32} />
                    <span className="ml-3 font-semibold text-2xl rounded-full">{name}</span>
                </a>
                <nav className="hidden lg:flex items-center text-base justify-center space-x-4">
                    {links.map((link) => {
                        return (
                            <Button color='inherit' href={link.href} key={link.name} startIcon={link.icon}>{link.name}</Button>
                        )
                    })}
                </nav>
                {(user === null) ? <Button className='ml-5 my-4' variant='contained' href='/accounts/login' startIcon={<Login />}>Login</Button>:
                <div>
                <Tooltip title='Profile'>
                    <IconButton 
                    onClick={handleClick}
                    size='medium'
                    className='ml-5'
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                        <Avatar sx={{ width: 50, height: 50}} src={user.profile ? user.profile : undefined} alt={user.username} />
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
                    <MenuItem onClick={() => setOpenModal(true)}>
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
                </div>}
            </div>
            {user && <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex items-center justify-center'
            >
                <Card className='p-10 flex relative flex-col md:flex-row'>
                    <IconButton size='small' onClick={handleModalClose} className='absolute top-0 right-0'>
                        <Close />
                    </IconButton>
                    <Avatar alt={user.username} src={user.profile ? user.profile : undefined} className='w-28 h-28 rounded-full hover:rounded-xl my-auto mx-auto' variant='square' />
                    <Divider className='m-4' orientation='vertical' flexItem />
                    {edit ? <>
                        <FormGroup className='space-y-4 md:min-w-[500px] max-w-[700px]' onChange={handleChange}>
                            <TextField value={updateUser.username} variant='filled' label='Username' id='username' />
                            <TextField value={updateUser.email} variant='filled' label='Email' id='email' />
                            <TextField value={updateUser.max_calories} variant='filled' label='Max. Calories' id='max_calories' />
                            <TextField variant='filled' label='New Password' id='password' type='password' />
                            <Input type='file' id='profile' />
                            <div className='flex flex-row justify-between'>
                                <Button variant='contained' color='success' onClick={() => {
                                    submit();
                                    setEdit(false);
                                }}>Update</Button>
                                <Button variant='contained' color='warning' onClick={() => setEdit(false)}>Cancel</Button>
                            </div>
                        </FormGroup>
                    </>:
                    <>
                    <Box>
                        <Typography variant='h4' className='mt-2'>{user.username}</Typography>
                        <Typography variant='h4' className='mt-2'>{user.email}</Typography>
                        <Typography variant='h6' className='mt-2 text-gray-500'>Max. Calories: {user.max_calories}</Typography>
                        <Button variant='contained' color='primary' className='mt-4' onClick={() => setEdit(true)}>Edit</Button>
                    </Box>
                    </>}
                </Card>
            </Modal>}
        </header>
    )
}

export default Navbar