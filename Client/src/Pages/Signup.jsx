import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Navbar/logo.png'
import Footer from "../components/Footer";
import { registrationContext } from "../App";

function Signup() {

    const { loggedin, setLoggedIn } = useContext(registrationContext);
    const [orderData, setOrderData] = useState()

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();
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
                    <label>name</label><input type="text" name="name" onChange={(e) => setName(e.target.value)} required />
                    <label>email</label><input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    <label>password</label><input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    <label>phone</label><input type="phone" name="phone" onChange={(e) => setPhone(e.target.value)} required />
                    <label>address</label><input type="text" name="address" onChange={(e) => setAddress(e.target.value)} required />
                    <button id="registerBtn" type="submit">Register</button>
                    <Link to={'/login'}>Already have an account | Login</Link>
                </form>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default Signup;