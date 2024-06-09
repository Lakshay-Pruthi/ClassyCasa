import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Navbar/logo.png'
import Footer from "../components/Footer";
import { registrationContext } from "../App";

function Signup() {

    const { loggedin, setLoggedIn } = useContext(registrationContext);

    const [orderData, setOrderData] = useState()

    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const phone = e.target[3].value;
        const address = e.target[4].value;

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({

                    "name": name,
                    "email": email,
                    "password": password,
                    "phone": phone,
                    "address": address

                })
            });
            if (res.ok) {
                const data = await res.json();
                setOrderData(data);
                await setLoggedIn(true)
                toast.success('Registered successfully', {
                    autoClose: 1000,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    onClose: () => {

                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    }
                })

            } else {
                const errorMsg = await res.json();
                toast.error(errorMsg.error,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                console.error('Request failed with status:', res.status);

            }
        } catch (error) {
            toast.error('Please try again after some time',
                {
                    autoClose: 5000,
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            console.error('Error fetching data:', error);

        }
    };





    return (
        <>
            <div className="userRegistration-outer">
                <Link to={'/'}>
                    <div className='logoContainer'>
                        <img src={logo} alt="" />
                        <p>ClassyCasa |</p>
                        <span>Your rental<br /> furniture store</span>
                    </div>
                </Link>
                <form id="userRegistration" onSubmit={registerUser}>
                    <h1>Signup</h1>
                    <p>name</p><input type="text" required />
                    <p>email</p><input type="email" required />
                    <p>password</p><input type="password" required minLength={8} />
                    <p>phone</p><input type="phone" required />
                    <p>address</p><input type="text" required />
                    <button id="registerBtn" type="submit">Register</button>
                    <Link to={'/Login'}>Already have an account | Login</Link>
                </form>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default Signup;