import MainLayout from '@/layout/MainLayout'
import { Food, create_food, get_today_foods } from '@/utils/api'
import { AddCircle } from '@mui/icons-material'
import { Container, Divider, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
}

const Today = ({ darkMode, toggleDarkMode }: Props) => {
    const [state, setState] = React.useState({
        foodType: '',
        food: '',
        foods: [],
    });

    const CATEG = ['breakfast', 'lunch', 'dinner', 'snacks']

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
                foodType: ''
            })
        })
    }

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        get_today_foods({ token }).then((res) => {
            setState({
                ...state,
                foods: res
            })
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },[])
  return (
    <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Container className='w-[100vw]'>
            <FormGroup className='flex md:flex-row mx-auto items-center justify-center'>
                <FormControl className='w-[15vw] min-w-[150px]'>
                    <InputLabel id='food-type'>Type</InputLabel>
                    <Select id='select-food-type' labelId='food-type' label='Type' value={state.foodType} className='rounded-none' onChange={handleTypeChange}>
                        <MenuItem value='breakfast'>Breakfast</MenuItem>
                        <MenuItem value='lunch'>Lunch</MenuItem>
                        <MenuItem value='dinner'>Dinner</MenuItem>
                        <MenuItem value='snacks'>Snacks</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Food' value={state.food} variant='outlined' className='w-[30vw] min-w-[200px]' 
                InputProps={{
                    endAdornment: <IconButton onClick={addFood}><AddCircle color='inherit' /></IconButton>
                }}
                onChange={(e) => setState({ ...state, food: e.target.value })}
                />
            </FormGroup>
            <Box className='flex flex-wrap py-10'>
                {CATEG.map((categ) => {
                    return (
                        <Box key={categ} className='p-4 md:w-full lg:w-1/2'>
                            <Paper className='h-full'>
                                <Typography variant='h5' className='text-center p-8'>{categ.toUpperCase()}</Typography>
                                <Divider />
                                {state.foods.filter((food: Food) => food.category === categ).map((food: Food) => {
                                    return (
                                        <Box key={food.id} className='flex items-center justify-between px-8 py-5'>
                                            <Typography>{food.name}</Typography>
                                            <Typography>{food.calorie} kcal</Typography>
                                        </Box>
                                    )
                                })}
                            </Paper>
                        </Box>
                    )
                })}
            </Box>
        </Container>
    </MainLayout>
  )
}

export default Today