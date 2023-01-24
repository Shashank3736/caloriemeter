import MainLayout from '@/layout/MainLayout'
import { Food, create_food, delete_food, get_today_foods, get_user } from '@/utils/api'
import { AddCircle , Delete } from '@mui/icons-material'
import { Container, Divider, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
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

const Today = ({ darkMode, toggleDarkMode }: Props) => {
    const [state, setState] = React.useState({
        foodType: '',
        food: '',
        foods: [],
        max_calories: 2000,
        calories: 0,
        error: null
    });

    const CATEG = ['breakfast', 'lunch', 'snacks', 'dinner']

    const handleTypeChange = (event: SelectChangeEvent) => {
        setState({
            ...state,
            foodType: event.target.value,
        });
    };

    function addFood() {
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        create_food({ token, name: state.food, category: state.foodType, date: new Date().toISOString().slice(0, 10) }).then((res) => {
            setState({
                ...state,
                foods: [...state.foods, res],
                food: '',
                foodType: '',
                calories: state.calories + res.calorie
            })
        }).catch((err) => {
            console.log(err)
            setState({
                ...state,
                food: '',
                foodType: '',
                error: err
            })
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

    function deleteFood(id: string, calorie: number) {
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        delete_food({ token, id }).then((res) => {
            const foods = state.foods.filter((food: Food) => food.id !== id)
            setState({
                ...state,
                foods,
                calories: state.calories - calorie
            })
        }).catch((err) => {
            console.log(err)
            setState({
                ...state,
                error: err
            })
        })
    }

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (!token || !id) return window.location.replace('/accounts/login')
        get_today_foods({ token }).then((res) => {
            let calories = 0
            res.forEach((food: Food) => {
                calories += food.calorie
            })
            setState({
                ...state,
                foods: res,
                calories
            })
        }).catch((err) => {
            console.log(err)
        })

        get_user({ token, id }).then((res) => {
            setState({
                ...state,
                max_calories: res.max_calories
            })
        }).catch((err) => {
            console.log(err)
        })
        console.log(state)
    },[])
  return (
    <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Container className='w-[100vw] relative'>
            <Typography variant='h4' className='text-center font-bold'>Today</Typography>
            <Box className='flex justify-center items-center overflow-auto mt-3'>
                <Typography variant='h6' className='font-bold mr-4'>Total Calories: <span className={state.max_calories >= state.calories ? 'text-blue-500': 'text-red-500'}>{state.calories.toFixed(2)}</span>/<strong>{state.max_calories}</strong></Typography>
                <CircularProgressbarWithChildren className='h-32 w-32' styles={buildStyles({
                    pathColor: state.max_calories >= state.calories ? '#3b82f6' : '#ef4444',
                    textColor: state.max_calories >= state.calories ? '#3b82f6' : '#ef4444',
                })} value={state.calories*100/state.max_calories}>
                    {state.max_calories >= state.calories ? <Typography variant='h6' className='font-bold'>{(state.calories*100/state.max_calories).toFixed(2)}%</Typography> : <Typography variant='h6' className='font-bold'>Over</Typography>}
                </CircularProgressbarWithChildren>
            </Box>
            <Divider className='my-5' />
            <FormGroup className='flex md:flex-row mx-auto items-center justify-center'>
                <FormControl className='w-[15vw] min-w-[150px]'>
                    <InputLabel id='food-type'>Type</InputLabel>
                    <Select id='select-food-type' labelId='food-type' label='Type' value={state.foodType} onChange={handleTypeChange}>
                        <MenuItem value='breakfast'>Breakfast</MenuItem>
                        <MenuItem value='lunch'>Lunch</MenuItem>
                        <MenuItem value='dinner'>Dinner</MenuItem>
                        <MenuItem value='snacks'>Snacks</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Food' value={state.food} variant='outlined' className='w-[30vw] min-w-[200px]' 
                InputProps={{
                    endAdornment:
                    <Tooltip title='Add Food'> 
                        <IconButton onClick={addFood}>
                            <AddCircle color='inherit' />
                        </IconButton>
                    </Tooltip>
                }}
                onChange={(e) => setState({ ...state, food: e.target.value })}
                />
            </FormGroup>
            <Box className='flex flex-wrap py-10'>
                {CATEG.map((categ) => {
                    return (
                        <Box key={categ} className='p-4 w-full md:w-1/2'>
                            <Paper className='h-full p-4 m-4 rounded'>
                                <Typography variant='body2' className='text-center p-4 font-semibold'>{categ.toUpperCase()}</Typography>
                                <Divider />
                                {state.foods.filter((food: Food) => food.category === categ).map((food: Food) => {
                                    return (
                                        <>
                                        <Box key={food.id} className='flex items-center justify-between px-8 py-1'>
                                            <Typography>{food.name}</Typography>
                                            <Typography>{food.calorie} kcal</Typography>
                                            <IconButton onClick={() => deleteFood(food.id, food.calorie)} color='error'><Delete /></IconButton>
                                        </Box>
                                        <Divider />
                                        </>
                                    )
                                })}
                                {state.foods.filter((food: Food) => food.category === categ).length === 0 && <Typography variant='caption' className='flex justify-center py-3 text-gray-400'>No food added</Typography>}
                            </Paper>
                        </Box>
                    )
                })}
            </Box>
        </Container>
        <Snackbar open={Boolean(state.error)} autoHideDuration={6000} onClose={handleErrorClose}>
            <Alert onClose={handleErrorClose} severity='error'>
                {state.error}
            </Alert>
        </Snackbar>
    </MainLayout>
  )
}

export default Today