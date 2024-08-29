
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Main from './Pages/Main'
import Home from './Pages/Home'
import UserOrders from './Pages/UserOrders'
import Product from './Pages/Product'
import About from './Pages/About'
import Category from './Pages/Category'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { createContext, useState } from 'react'
import User from './Pages/User'
import ForgotPassword from './Pages/ForgotPassword'
import Error404 from './Pages/Error404'
import Checkout from './Pages/Checkout'


export const registrationContext = createContext();


function App() {



  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <registrationContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route path='/' element={<Main />} >
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='userOrders' element={<UserOrders />} />
            <Route path='product/:productIndex' element={<Product />} />
            <Route path='checkout/:productIndex' element={<Checkout />} />
            <Route path='category/:type' element={<Category />} />
            <Route path='user' element={<User />} />
            <Route path='*' element={<Error404 />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />

        </Routes>
      </registrationContext.Provider>
    </BrowserRouter>


  )
}

export default App
