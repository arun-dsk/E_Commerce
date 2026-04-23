import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Trending from './Components/Trends/Trending'
import { ThemeProvider } from './Context/ThemeContext'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <ThemeProvider>
      <Toaster position='top-center'/>
      <Navbar />
      <Hero />
      <Trending />
      <Footer/>
    </ThemeProvider>
  )
}

export default App