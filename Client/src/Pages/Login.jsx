import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from '../assets/Navbar/logo.png'
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { registrationContext } from "../App";


function Login() {

    const { loggedIn, setLoggedIn } = useContext(registrationContext);



    async function loginUser(e) {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({

                    "email": email,
                    "password": password

                })
            });
            if (res.ok) {
                const data = await res.json();
                await setLoggedIn(true);
                toast.success(data.message, {
                    autoClose: 1500,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    onClose: () => {

                        setTimeout(() => {
                            window.location.href = '/ClassyCasa/';
                        }, 3000);
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
            toast.error(error,
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
                <Link to={'/ClassyCasa/'}>
                    <div className='logoContainer'>
                        <img src={logo} alt="" />
                        <p>ClassyCasa |</p>
                        <span>Your rental<br /> furniture store</span>
                    </div>
                </Link>
                <form id="userRegistration" onSubmit={loginUser}>
                    <h1>Login</h1>
                    <p>email</p><input type="email" required />
                    <p>password</p><input type="password" required minLength={8} />
                    <button id="registerBtn" type="submit">Login</button>
                    <Link to='/ClassyCasa/Signup'>No Account | Signup</Link>
                </form>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default Login;