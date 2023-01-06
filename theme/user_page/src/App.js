import React from 'react'
import './App.css'
import Footer from './containers/Footer'
import Main from './containers/Main'
import Navbar from './containers/Navbar'



const App = () => {
  return (
    <>
    <Navbar name='{user_name}'/>
    <Main />
    <Footer />
    </>
  )
}

export default App