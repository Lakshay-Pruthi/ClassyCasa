import { useContext, useEffect, useState } from "react";
import Orders from "./Orders";
import { MainContext } from "./Main";
import { useNavigate } from "react-router-dom";


function UserOrders() {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    const { userData } = useContext(MainContext);

    useEffect(() => {
        const fetchData = async () => {
            if (userData === null) {
                navigate('/login')
                console.log('hello');
            }
            try {
                const { email } = userData;

                const res = await fetch('/api/getOrders', {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrderData(data);
                    console.log(data);

                } else {
                    console.error('Request failed with status:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userData])





    return (
        <>
            <div id="order-outer">
                <img src="" alt="" />
                <h1>Your orders</h1>
                <div id="orders">
                    <Orders orderData={orderData} />
                </div>
            </div>
        </>
    )
}

export default UserOrders;