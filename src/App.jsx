import heroImg from './assets/hero.png'
import React, { useState, useEffect } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
const [loading, setloading] = useState(true)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  })
  .finally(() => setloading(false))
}, [])

// console.log(import.meta.env.VITE_APPRWRITE_ENDPOINT); // using import.meta because app is build using vite, in case of react app process.env is used.

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main className='text-2xl text-black'>
           <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
