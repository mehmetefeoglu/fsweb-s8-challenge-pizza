import { useState } from 'react'
import './App.css'
import Header from './assets/components/header/header'
import Home from './assets/components/home/home'
import Order from './assets/components/order/order'
import Success from './assets/components/success/success'
import Footer from './assets/components/footer/footer'


function App() {
  
  return (
    <>
    <Header/>
    <Home></Home>
    <Order></Order>
    <Success></Success>
    <Footer></Footer>
    </>
  )
}

export default App
