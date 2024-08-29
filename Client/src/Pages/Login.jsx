import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from '../assets/Navbar/logo.png'
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { registrationContext } from "../App";


function Login() {

    const { loggedIn, setLoggedIn } = useContext(registrationContext);
    const navigate = useNavigate();



    async function loginUser(e) {
        e.preventDefault();
        console.log(e);
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
                        navigate('/')
                    }
                })

            } else {
                const errorMsg = await res.json();
                toast.error(errorMsg.error,
                    {
                        autoClose: 3000,
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
                <Link to={'/'}>
                    <div className='logoContainer'>
                        <img src={logo} alt="" />
                        <p>ClassyCasa |</p>
                        <span>Your rental<br /> furniture store</span>
                    </div>
                </Link>
                <form id="userRegistration" onSubmit={loginUser}>
                    <h1>Login</h1>
                    <label>email</label><input name="emailInput" type="email" required />
                    <label>password</label><input name="passwordInput" type="password" required minLength={8} />
                    <button id="registerBtn" type="submit">Login</button>
                    <div id="loginFormLinks">
                        <Link to='/signup'>No Account | Signup</Link>
                        {/* <Link to='/forgotPassword'>Forgot Password</Link> */}
                    </div>
                </form>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default Login;