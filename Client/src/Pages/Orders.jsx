import { useEffect, useState } from "react";
import OrderCard from '../components/miniComponents/OrderCard'
import { Link } from 'react-router-dom'

function Orders(props) {
    const { orderData } = props;
    const [orderedItems, setOrderedItems] = useState([]);
    useEffect(() => {
        function loadOrders() {
            const length = orderData.length;
            for (let i = 0; i < length; i++) {
                setOrderedItems(orderData.map((e) => {
                    const { id, rentalTime, address, createdAt, expectedDelivery, total } = e;
                    return <Link to={`/product/${id}`}><OrderCard id={id} rentalTime={rentalTime} address={address} createdAt={createdAt} expectedDelivery={expectedDelivery} total={total} /></Link>
                }))
            }
        }
        orderData && loadOrders();
    }, [orderData])
    return (
        <>
            {orderData.length != 0 ? orderedItems : 'No orders yet'}
        </>
    )
}


export default Orders;