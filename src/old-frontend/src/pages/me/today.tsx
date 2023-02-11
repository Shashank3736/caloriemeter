import MainLayout from '@/layout/MainLayout'
import { Food, User, create_food, delete_food, get_foods_by_date, get_user } from '@/utils/api'
import { AddCircle , Delete } from '@mui/icons-material'
import { Container, Divider, FormControl, Box, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Table, TableBody, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import React, {useState, useEffect, FormEvent} from 'react'
import moment from 'moment'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Alert from '@/components/Alert'
import CircularProgressWithLabel from '@/components/Progress'
import { StyledTableCell, StyledTableRow } from '@/components/Table'

interface State {
    foodType: 'breakfast' | 'lunch' | 'snacks' | 'dinner' | ''
    food: string
}

type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
}

const Today = ({ darkMode, toggleDarkMode }: Props) => {
    const [state, setState] = useState<State>({
        foodType: '',
        food: '',
    });
    const [date, setDate] = useState(new Date());
    const [api, setApi] = useState(true);
    const [error, setError] = useState<any>(null);
    const [calories, setCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(2000);
    const [foods, setFoods] = useState<Food[]>([]);

    const CATEG = ['breakfast', 'lunch', 'snacks', 'dinner']

    const handleTypeChange = (event: SelectChangeEvent) => {
        if(event.target.value === 'breakfast') setState({...state, foodType: 'breakfast'})
        else if(event.target.value === 'lunch') setState({...state, foodType: 'lunch'})
        else if(event.target.value === 'snacks') setState({...state, foodType: 'snacks'})
        else if(event.target.value === 'dinner') setState({...state, foodType: 'dinner'})
    };

    function addFood(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        if (!state.foodType || !state.food) return setError('Please fill all the fields!')
        create_food({ token, name: state.food, category: state.foodType, date: date.toISOString().slice(0, 10) }).then((res) => {
            setFoods([...foods, res])
            setCalories(calories + res.calorie)
        }).catch((err) => {
            console.log(err)
            setError(err)
        }).finally(() => {
            setState({
                food: '',
                foodType: '',
            })
        })
    }

    function handleErrorClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        setError(null);
    }

    function deleteFood(id: string, calorie: number) {
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        delete_food({ token, id }).then((res) => {
            const newFoods = foods.filter((food: Food) => food.id !== id)
            setFoods(newFoods)
            setCalories(calories - calorie)
        }).catch((err) => {
            console.log(err)
            setError(err ? err : 'Failed to connect with the api!')
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (!token || !id) return window.location.replace('/accounts/login')
        // get foods
        get_foods_by_date({ token, date: date.toISOString().slice(0, 10) }).then((res) => {
            let calories = 0
            res.forEach((food: Food) => {
                calories += food.calorie
            })
            setFoods(res)
            setCalories(calories)
        }).catch((err) => {
            setError(err || 'Failed to connect with the api!')
            console.log(err)
            if(!err) setApi(false)
        })
        // get max calories
        get_user({ token, id }).then((user: User) => {
            setMaxCalories(user.max_calories || 2000)
        }).catch((err) => {
            setError(err || 'Failed to connect with the api!')
            console.log(err)
            if(!err) setApi(false)
            else {
                localStorage.removeItem('token')
                localStorage.removeItem('id')
                window.location.replace('/accounts/login')
            }
        })
    },[date])
    return (
    <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Container className='w-[100vw] relative'>
            {!api &&
            <Typography variant='h3' className='text-center text-red-500 font-bold'>Failed to connect with the api!</Typography>}
            <Typography variant='h4' className='text-center font-bold mb-4'>
                {date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) ? 'Today' : moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
            </Typography>
            <Box className='flex items-center justify-center'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker disableFuture
                    className='flex md:hidden'
                    label="Select Date"
                    value={date}
                    inputFormat='YYYY-MM-DD'
                    onChange={(newValue) => {
                        if(!newValue) return
                        setDate(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker disableFuture
                    className='md:flex hidden'
                    label="Select Date"
                    value={date}
                    inputFormat='YYYY-MM-DD'
                    onChange={(newValue) => {
                        if(!newValue) return
                        setDate(newValue)
                    }}
                    componentsProps={{
                        actionBar: {
                            actions: ['today']
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Box component='form' className='flex justify-center items-center overflow-auto mt-3'>
                <Typography variant='h6' className='font-bold mr-4'>Total Calories: <span className={maxCalories >= calories ? 'text-blue-500': 'text-red-500'}>{calories.toFixed(2)}</span>/<strong>{maxCalories}</strong></Typography>
                <CircularProgressWithLabel value={calories*100/maxCalories} size={60} />
            </Box>
            {/* Divider */}
            <Divider className='my-5' />
            <Box component='form' onSubmit={(e) => addFood(e)} className='flex md:flex-row mx-auto items-center justify-center'>
                <FormControl className='w-[15vw] min-w-[150px]'>
                    <InputLabel id='food-type'>Type</InputLabel>
                    <Select id='select-food-type' labelId='food-type' label='Type' value={state.foodType} onChange={handleTypeChange}>
                        <MenuItem value='breakfast'>Breakfast</MenuItem>
                        <MenuItem value='lunch'>Lunch</MenuItem>
                        <MenuItem value='snacks'>Snacks</MenuItem>
                        <MenuItem value='dinner'>Dinner</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Food' value={state.food} variant='outlined' className='w-[30vw] min-w-[200px]' 
                InputProps={{
                    endAdornment:
                    <Tooltip title='Add Food'> 
                        <IconButton type='submit'>
                            <AddCircle color='inherit' />
                        </IconButton>
                    </Tooltip>
                }}
                onChange={(e) => setState({ ...state, food: e.target.value })}
                />
            </Box>
            <Box className='flex flex-wrap py-10'>
                {CATEG.map((categ) => {
                    return (
                        <Box key={categ} className='p-4 w-full md:w-1/2'>
                            <Paper className='h-full p-4 rounded'>
                                <Typography variant='body2' className='text-center p-4 font-semibold'>{categ.toUpperCase()}</Typography>
                                <Divider />
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Food</StyledTableCell>
                                            <StyledTableCell align="center">Calorie</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {foods.filter((food: Food) => (food.category === categ)).map((food: Food) => {
                                            return (
                                                <StyledTableRow key={food.id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {food.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{food.calorie} kcal</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Tooltip title='Delete Food'>
                                                            <IconButton onClick={() => deleteFood(food.id, food.calorie)} color='error'>
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                                {foods.filter((food: Food) => food.category === categ).length === 0 && <Typography variant='caption' className='flex justify-center py-3 text-gray-400'>No food added</Typography>}
                            </Paper>
                        </Box>
                    )
                })}
            </Box>
        </Container>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleErrorClose}>
            <Alert onClose={handleErrorClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    </MainLayout>
  )
}

export default Today