import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { MainContext } from '../../Pages/Main';

function OrderCard(props) {
    const { furnitureData } = useContext(MainContext);
    const { id, rentalTime, address, createdAt, expectedDelivery, total } = props;
    const { name, image, price } = furnitureData[id];
    return (
        <>
            <Link to={`/product/${id}`} >
                <div className="orderCard">
                    <img src={image} alt="" />
                    <div>

                        <p>Order date: {createdAt}</p>
                        <p>Expected delivery: {expectedDelivery}</p>
                        <p>Order status: In transit</p>

                    </div>
                    <div>
                        <p>{name}</p>
                        <p>tenure : {rentalTime} M</p>
                        <p>{address}</p>
                        <p>price : ${price / 1000} / M</p>
                        <p>total : ${total}</p>
                    </div>
                </div>
            </Link >
        </>
    )
}

export default OrderCard;