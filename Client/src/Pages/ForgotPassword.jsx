import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from '../assets/Navbar/logo.png'
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { registrationContext } from "../App";


function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [OTP, setOTP] = useState()
    const [OTPSent, setOTPSent] = useState(false);
    const [sessionId, setSessionId] = useState();

    async function sendOTP() {
        try {
            const res = await fetch('/api/forgotPassword', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                })
            });
            if (res.ok) {
                const data = await res.json();
                setSessionId(data.id);
                toast.success(data.message, {
                    autoClose: 750,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    onClose: () => {
                        setOTPSent(true);
                    }
                })

            } else {
                const errorMsg = await res.json();
                toast.error(errorMsg.error,
                    {
                        autoClose: 15000,
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




    async function verifyOTP(e) {
        e.preventDefault();

        try {
            const res = await fetch('/api/forgotPassword/', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    "OTP": OTP,
                })
            });
            console.log(res.ok);
            if (res.ok) {
                const data = await res.json();

                toast.success(data.message, {
                    autoClose: 1500,
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            } else {
                const errorMsg = await res.json();
                toast.error(errorMsg.error,
                    {
                        autoClose: 15000,
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                console.error('Request failed with status:', res.status);

            }
        } catch (error) {
            toast.error('Some error occured',
                {
                    autoClose: 5000,
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            console.error('Error fetching data:', error);

        }
    }

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
                <form id="userRegistration">
                    <h1>Reset Password</h1>
                    <label>email</label><input name="email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                    {OTPSent ?
                        <><label>OTP</label><input name="OTP" type="number" onChange={(e) => setOTP(e.target.value)} required />
                            <button id="registerBtn" type="button" onClick={verifyOTP}>Submit</button>
                            <div>
                                <p>This OTP is only valid for 10 minutes.</p>
                            </div>
                        </>

                        :

                        <button id="registerBtn" type="button" onClick={sendOTP}>Send OTP</button>
                    }
                    <div id="loginFormLinks">
                        <Link to='/Signup'>No Account | Signup</Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}


export default ForgotPassword;