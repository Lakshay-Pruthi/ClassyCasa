import AllProductts from '../components/AllProducts'
import Banner from '../components/Banner';
import Featured from '../components/Featured'
import { useEffect } from "react";

import img1 from '../assets/Slider/Slider1.jpg'
import img2 from '../assets/Slider/Slider2.jpg'
import img3 from '../assets/Slider/Slider3.jpg'
import { Outlet } from 'react-router-dom';



function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="container">
                <Outlet />
                <Featured />
                <AllProductts From={0} To={3} />
                <h1 className='heading'>Explore More</h1>
                <Banner Title={'Office'} Image={img1} />
                <AllProductts From={3} To={9} />
                <Banner Title={'Living Room'} Image={img2} />
                <AllProductts From={9} To={15} />
                <Banner Title={'Kids'} Image={img3} />
                <AllProductts From={15} To={21} />
            </div>
        </>
    )
}

export default Home;