import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { ThemeProvider } from '../Context/ThemeContext'
import MyCart from '../Components/Mycart/Mycart'
import Footer from '../Components/Footer/Footer'
import "react-router-hash-link"

const CartPage = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <MyCart />
      <Footer/>
    </ThemeProvider>
  )
}

export default CartPage