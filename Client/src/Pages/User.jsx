import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function User() {
    const { userData } = useContext(MainContext);


    useEffect(() => {
        function loadDetails() {
            const { name, email, phone, address } = userData;
            setName(name);
            setEmail(email)
            setOldEmail(email)
            setPhone(phone)
            setAddress(address)
        }
        userData && loadDetails();
    }, [userData])
    const [Name, setName] = useState('...');
    const [Email, setEmail] = useState('...');
    const [oldEmail, setOldEmail] = useState();
    const [Phone, setPhone] = useState('...');
    const [Address, setAddress] = useState('...');
    const [editAccess, setEditAccess] = useState(false)


    async function editUserDetails(e) {
        e.preventDefault();
        console.log(Name, Email, Phone, Address);
        const res = await fetch('/api/updateUserDetails', {
            method: 'PUT',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({

                "name": Name,
                "oldEmail": oldEmail,
                "newEmail": Email,
                "phone": Phone,
                "address": Address

            })
        })

        if (res.ok) {
            const data = await res.json();
            toast.success(data.message, {
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else {
            toast.error('Try again later', {
                autoClose: 1000,
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
        setEditAccess(!editAccess);
    }

    async function logout() {

        window.location.href = '/login'

    }
    return (
        <>
            <div id="accountBtn">
                <button onClick={logout}>Logout</button>
            </div>
            <div className="userRegistration-outer">

                <form id="userRegistration" >
                    <h1>Your Account</h1>
                    <p>name</p><input type="text" value={Name} readOnly={!editAccess} onChange={(e) => setName(e.target.value)} />
                    <p>email</p><input type="email" value={Email} readOnly />
                    <p>phone</p><input type="phone" value={Phone} readOnly={!editAccess} onChange={(e) => setPhone(e.target.value)} />
                    <p>address</p><input type="text" value={Address} readOnly={!editAccess} onChange={(e) => setAddress(e.target.value)} />
                    {editAccess ?
                        <button id="registerBtn" onClick={editUserDetails} type="button">Save</button>
                        :
                        <button id="registerBtn" onClick={() => setEditAccess(!editAccess)} type="button">Edit</button>
                    }
                </form>
            </div >
            <ToastContainer />
        </>
    )
}

export default User;