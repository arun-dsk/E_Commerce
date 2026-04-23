import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { ThemeProvider } from '../Context/ThemeContext'
import Productinfo from '../Components/ProductInfo/ProductInfo'
import Footer from '../Components/Footer/Footer'

const DynamicProduct = () => {

  return (
    <ThemeProvider>
      <Navbar />
      <Productinfo />
      <Footer />
    </ThemeProvider>
  )
}

export default DynamicProduct