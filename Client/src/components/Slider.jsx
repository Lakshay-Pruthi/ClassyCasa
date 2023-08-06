import { useEffect, useState } from 'react'
import img1 from '../assets/Slider/Slider1.jpg'
import img2 from '../assets/Slider/Slider2.jpg'
import img3 from '../assets/Slider/Slider3.jpg'
import img4 from '../assets/Slider/Slider4.jpg'
import img5 from '../assets/Slider/Slider5.jpg'

function Slider() {
    const [count, setCount] = useState(0);
    const [margins, setMargins] = useState(0);


    useEffect(() => {
        const slider = document.getElementById('slider');

        const intervalId = setInterval(() => {
            slider.style.marginLeft = margins + 'px';
            if (count == 4) {
                setCount(0);
                setMargins(0);
            } else {
                console.log(margins);
                setMargins(margins - 100);
                setCount(count + 1);
                console.log(margins);
            }
        }, 1500);
    }, [])






    return (
        <>
            <div id="slider">
                <div className='imgContainer'>
                    <img src={img1} alt="" />
                </div>
                <div className='imgContainer'>
                    <img src={img2} alt="" />
                </div>
                <div className='imgContainer'>
                    <img src={img3} alt="" />
                </div>
                <div className='imgContainer'>
                    <img src={img4} alt="" />
                </div>
                <div className='imgContainer'>
                    <img src={img5} alt="" />
                </div>
            </div>
        </>
    )
}
export default Slider;