import MainLayout from '@/layout/MainLayout'
import { User, get_user, update_user } from '@/utils/api'
import { Box, Button, Container, Divider, FormGroup, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
}


const Settings = ({ darkMode, toggleDarkMode }: Props) => {
  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
    max_calories: 0,
    error: null
  })

  const [edit, setEdit] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.id]: event.target.value })
  }

  const submit = () => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (!token || !id) return
    update_user({ ...state, token, id })  
    .then((res: User) => {
      window.location.reload()
    }).catch((err: any) => {
      setState({ ...state, error: err })
    })
  }

  function handleErrorClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
        return;
    }
    setState({
        ...state,
        error: null
    })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (!token || !id) return
    get_user({ token, id })
    .then((res: User) => {
      setState({
        ...state,
        username: res.username,
        email: res.email || '',
        max_calories: res.max_calories || 0,
      })
    })
  }, [])
  return (
    <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <Container>
        <Paper className='p-8'>
          <Typography className='text-center' variant="h3">Settings</Typography>
          <Divider className='my-4' />
          {edit ? <FormGroup className='space-y-4 max-w-[700px]' onChange={handleChange}>
            <TextField value={state.username} variant='filled' label='Username' id='username' />
            <TextField value={state.email} variant='filled' label='Email' id='email' />
            <TextField value={state.max_calories} variant='filled' label='Max. Calories' id='max_calories' />
            <TextField variant='filled' label='Password' id='password' type='password' />
            <Button variant='contained' color='primary' onClick={submit}>Update</Button>
          </FormGroup>:
          <Box>
            <Typography variant='h5'><strong>Username:</strong> {state.username}</Typography>
            <Typography variant='h5'><strong>Email:</strong> {state.email}</Typography>
            <Typography variant='h5'><strong>Max. Calories:</strong> {state.max_calories}</Typography>
          </Box>}
          <Button className='mt-4' variant='contained' color='primary' onClick={() => setEdit(!edit)}>{edit? 'Back': 'Edit'}</Button>
        </Paper>
        <Snackbar open={Boolean(state.error)} autoHideDuration={6000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} severity='error'>
            {state.error}
          </Alert>
        </Snackbar>
      </Container>
    </MainLayout>
  )
}

export default Settings