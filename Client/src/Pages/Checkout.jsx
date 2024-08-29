import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "./Main";
import { useParams } from "react-router-dom";
import AddressForm from "../components/AddressForm";




function Checkout() {
    const navigate = useNavigate();
    const { productIndex } = useParams()
    const { userData, furnitureData } = useContext(MainContext)
    const [product, setProduct] = useState({
        title: null,
        imageURL: null,
        price: null,
    })
    const [rentalTime, setRentalTime] = useState(1);


    const [couponApplied, setCouponApplied] = useState(false);
    const [invalidCoupon, setInvalidCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState();
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        function loadData() {

            if (userData == null) {
                navigate('/login')
            }

            const { name, image, price } = furnitureData[productIndex];
            setProduct({
                productIndex: productIndex,
                title: name,
                imageURL: image,
                price: price
            })
        }
        loadData();
    }, productIndex)

    async function applyCoupon(e) {
        e.preventDefault();
        const res = await fetch('/api/couponDiscount', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                id: productIndex,
                couponCode: couponCode,
            })
        })

        if (res.ok) {
            const data = await res.json();
            const discount = parseInt(data.discount);
            setDiscount(discount);
            setInvalidCoupon(false);
            setCouponApplied(true);
        } else {
            setDiscount(0);
            setInvalidCoupon(true);
            setCouponApplied(false);
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="checkout-container-outer">
                    <div className="checkout-container">
                        <h2>Select an address</h2>
                        <hr />
                        <div >
                            <div className="checkout-heading-container">
                                <img id="checkout-image" src={product.imageURL} alt="" />
                                <p>{product.title}</p>
                            </div>
                            <AddressForm rentalTime={rentalTime} setRentalTime={setRentalTime} product={product} total={(product.price * rentalTime) - discount} />
                        </div>
                    </div>
                    <div className="order-summary-container">
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <hr />
                            <p><span>Item :</span> <span>{product.title}</span></p>
                            <p><span>Item price : </span><span>${product.price}</span></p>
                            <p><span>Rental time : </span><span>{rentalTime} month</span></p>
                            {couponApplied && discount && <p><span>Discount : </span><span>${discount}</span></p>}
                            <p><span>Delivery charge :</span> <span>Free</span></p>
                            <hr />
                            <h3>Order Total : ${(product.price * rentalTime) - discount}</h3>
                        </div>

                        <div className="coupon-code">
                            <label htmlFor="">Apply coupon code</label>
                            <form className="coupon-form" onSubmit={applyCoupon}>
                                <input type="text" placeholder="Try HAPPYRENT to get $10 off" onChange={(e) => setCouponCode(e.target.value)} /><button type="submit">Apply</button>
                            </form>
                            {invalidCoupon && <p style={{ color: "red" }}>Invalid Coupon code</p>}
                        </div>


                    </div>

                </div>

            </div>

        </>
    )
}

export default Checkout;