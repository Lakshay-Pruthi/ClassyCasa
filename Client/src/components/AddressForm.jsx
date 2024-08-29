import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
const Stripe = loadStripe('pk_test_51PqDTtRsaHWxRr2AOXQGoxFTe2zXTLmu5F4M2F9KizwiOtTFUYC0GOu94oYWJbAcpHQIQ5bfeM7YGBx3vH5e7mn100zt9GcoGz');


function AddressForm({ rentalTime, setRentalTime, product, total }) {

    const [checked, setChecked] = useState(false)

    const [address, setAddress] = useState({
        name: null,
        appartment: null,
        street: null,
        city: null,
        zipCode: null
    })


    async function rentProduct(e) {
        e.preventDefault();

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    product: product,
                    rentalTime: rentalTime,
                    total: total,
                })
            })

            if (res.ok) {

                const data = await res.json();
                const sessionID = data.sessionID;
                const stripe = await Stripe;

                stripe.redirectToCheckout({
                    sessionId: sessionID
                })
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form id="address-form" onSubmit={rentProduct}>
                <div className='minimized-form'>
                    <div id='rental-time-selector'>
                        <label htmlFor="">Tenure (in months)</label>
                        <select name="select" id="" defaultValue={1} onChange={(e) => { setRentalTime(e.target.value) }} >
                            <option value="24">24</option>
                            <option value="18">18</option>
                            <option value="12">12</option>
                            <option value="6">06</option>
                            <option value="3">03</option>
                            <option value="1" selected>01</option>
                        </select>
                    </div>
                    <div id='checkbox-container'>
                        <input type="checkbox" id="useDefaultAddress" onChange={() => setChecked(!checked)} />
                        <label htmlFor="useDefaultAddress">use default name and address</label>
                    </div>
                </div>

                {!checked &&
                    <>
                        <div id="address">
                            <label htmlFor="">name</label>
                            <input type="text" required onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                            <label htmlFor="">apartment</label>
                            <input type="text" required onChange={(e) => setAddress({ ...address, apartment: e.target.value })} />
                            <label htmlFor="">street name</label>
                            <input type="text" required onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                            <label htmlFor="">city</label>
                            <input type="text" required onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                            <label htmlFor="">zip code</label>
                            <input type="number" required onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} />
                        </div>
                        <h7>Note : This address will be used for delivery of your product</h7>
                    </>
                }


                <div className="address-form-buttons buttonGroup">
                    <Link to={`/product/${product.productIndex}`}><button className="buyBtn" type="button">Cancel</button></Link>
                    <button className="buyBtn" type="submit">Proceed to pay</button>
                </div>
            </form>
        </>
    )
}

export default AddressForm;