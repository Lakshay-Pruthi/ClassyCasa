import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import productData from '../data.json'

export const MainContext = createContext();


function Main() {
    const [furnitureData, setFurnitureData] = useState(productData);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        async function loginUser() {
            try {
                const res = await fetch('/api/authenticate', {
                    method: 'GET',
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data)
                    setLoggedIn(true)


                } else {
                    const errorMsg = await res.json();
                }
            } catch (error) {
                toast.error(error,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                console.error('Error fetching data:', error);
            }
        }
        loginUser();
    }, [])





    return (
        <>
            <MainContext.Provider value={{ furnitureData, loggedIn, setLoggedIn, userData }}>
                <Navbar />
                <Outlet />
                <ToastContainer />
                <Footer />

            </MainContext.Provider>
        </>
    )
}

export default Main;