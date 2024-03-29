import Head from 'next/head'
import { Button, Container, Divider, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import MainLayout from '@/layout/MainLayout'
import { useState } from 'react'
import { Box } from '@mui/system'

type Props = {
  darkMode: 'light' | 'dark'
  toggleDarkMode: () => void
}

export default function Home({ darkMode, toggleDarkMode }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [{
    label: 'Create an account',
    description: 'Start with creating an account to get started. We just need username, email and password to get started.',
  }, {
    label: 'Add your food',
    description: 'Go to the food section and add your food to get started. You can add your food by searching in the search box in 4 diff. timelines.',
  }, {
    label: 'Track your progress',
    description: 'Track your progress with our great and simple UI. You can track your progress in the same today page. Just click on your profile picture and you will see todat option.',
  }]
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Container>
          <section className='flex flex-col lg:flex-row justify-center items-center overflow-auto py-10'>
            <div className='text-center'>
            <Typography fontWeight={600} variant="h2">
              Your Health
            </Typography>
            <Typography className='text-blue-600 dark:text-blue-400' fontWeight={600} variant="h2">
              Your Way
            </Typography>
            </div>
            {/* // eslint-disable-next-line @next/next/no-img-element */}
            <img src='/robot-serving-food.svg' className='overflow-auto max-w-2xl' alt='home' />
          </section>
          <section className='flex flex-col justify-center items-center overflow-auto py-10'>
            <Typography fontWeight={600} variant="h2">How it <span className='text-blue-600 dark:text-blue-400'>works?</span></Typography>
            <Divider className='w-full py-4' />
            <div className='w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center overflow-auto lg:pt-0 pt-4'>
              <img src='/indian-mother-making-sweets.svg' className='overflow-auto max-w-2xl' alt='mother-cooking-home' />
              <div className='overflow-auto lg:w-1/2'>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === (steps.length - 1) ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                  ))}
                </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}  
              </div>
            </div>
            <Button href='/me/today' variant='contained' className='mt-4 py-3 px-6 rounded-xl'>Get Started</Button>
          </section>
        </Container>
      </MainLayout>
    </>
  )
}
