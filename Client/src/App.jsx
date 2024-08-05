
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
import { createContext, useEffect, useState } from 'react'
import BuyNow from './Pages/BuyNow'
import User from './Pages/User'
import ForgotPassword from './Pages/ForgotPassword'
import Error404 from './Pages/Error404'


export const registrationContext = createContext();


function App() {



  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <registrationContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route path='/' element={<Main />} >
            <Route index element={<Home />} />
            <Route path='About' element={<About />} />
            <Route path='UserOrders' element={<UserOrders />} />
            <Route path='product/:productIndex' element={<Product />} />
            <Route path='BuyNow/:productIndex' element={<BuyNow />} />
            <Route path='Category/:type' element={<Category />} />
            <Route path='User' element={<User />} />
            <Route path='*' element={<Error404 />} />
          </Route>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />

        </Routes>
      </registrationContext.Provider>
    </BrowserRouter>


  )
}

export default App
