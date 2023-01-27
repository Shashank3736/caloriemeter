import { Box, CircularProgress, CircularProgressProps, Typography, circularProgressClasses } from "@mui/material";

export default function CircularProgressWithLabel(
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