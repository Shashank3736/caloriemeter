import MainLayout from '@/layout/MainLayout'
import { Food, User, create_food, delete_food, get_today_foods, get_user } from '@/utils/api'
import { AddCircle , Delete } from '@mui/icons-material'
import { CircularProgress, CircularProgressProps, Container, Divider, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography, circularProgressClasses, styled, tableCellClasses } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));


type Props = {
    darkMode: 'light' | 'dark'
    toggleDarkMode: () => void
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress {...props} 
        variant='determinate' 
        value={100} 
        sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}/>
        <CircularProgress {...props}
        variant='determinate'
        value={props.value > 100 ? 100 : props.value}
        sx={{
            color: (theme) => (props.value <= 100 ? (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'): (theme.palette.mode === 'light' ? '#ff1744' : '#d50000')),
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

interface State {
    foodType: 'breakfast' | 'lunch' | 'snacks' | 'dinner' | ''
    food: string
    foods: Food[]
    max_calories: number
    calories: number
    error: any
}

const Today = ({ darkMode, toggleDarkMode }: Props) => {
    const [state, setState] = React.useState<State>({
        foodType: '',
        food: '',
        foods: [],
        max_calories: 2000,
        calories: 0,
        error: null
    });

    const [api, setApi] = React.useState(true);

    const CATEG = ['breakfast', 'lunch', 'snacks', 'dinner']

    const handleTypeChange = (event: SelectChangeEvent) => {
        if(event.target.value === 'breakfast') setState({...state, foodType: 'breakfast'})
        else if(event.target.value === 'lunch') setState({...state, foodType: 'lunch'})
        else if(event.target.value === 'snacks') setState({...state, foodType: 'snacks'})
        else if(event.target.value === 'dinner') setState({...state, foodType: 'dinner'})
    };

    function addFood() {
        const token = localStorage.getItem('token')
        if (!token) return window.location.replace('/accounts/login')
        if (!state.foodType || !state.food) return setState({
            ...state,
            error: 'Please fill all fields'
        })
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
            get_user({ token, id }).then((user: User) => {
                setState({
                    ...state,
                    max_calories: user.max_calories || 2000,
                    foods: res,
                    calories
                })
            }).catch((err) => {
                setState({ ...state, error: err || 'Failed to connect with the api!'})
                console.log(err)
                if(!err) setApi(false)
                
            })
        }).catch((err) => {
            setState({ ...state, error: err || 'Failed to connect with the api!'})
            console.log(err)
            if(!err) setApi(false)
        })
    },[])
    return (
    <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Container className='w-[100vw] relative'>
            {!api &&
            <Typography variant='h3' className='text-center text-red-500 font-bold'>Failed to connect with the api!</Typography>}
            <Typography variant='h4' className='text-center font-bold'>Today</Typography>
            <Box className='flex justify-center items-center overflow-auto mt-3'>
                <Typography variant='h6' className='font-bold mr-4'>Total Calories: <span className={state.max_calories >= state.calories ? 'text-blue-500': 'text-red-500'}>{state.calories.toFixed(2)}</span>/<strong>{state.max_calories}</strong></Typography>
                <CircularProgressWithLabel value={state.calories*100/state.max_calories} size={60} />
            </Box>
            <Divider className='my-5' />
            <FormGroup className='flex md:flex-row mx-auto items-center justify-center'>
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
                                        {state.foods.filter((food: Food) => food.category === categ).map((food: Food) => {
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