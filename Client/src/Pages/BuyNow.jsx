import { useState, useEffect, useContext } from "react";
import { MainContext } from "./Main";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function BuyNow() {
    const { productIndex } = useParams()
    const { userData, furnitureData } = useContext(MainContext)

    const [imgURL, setImageURL] = useState(null);
    const [Title, setTitle] = useState('Loading...')
    const [Price, setPrice] = useState('Loading...')
    const [Brand, setBrand] = useState('Loading...')
    const [Shipping, setShipping] = useState('Loading...')

    const [checked, setChecked] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {

        function loadProduct() {
            if (userData == null) {
                navigate('/login')
            }
            const { name, image, company, price, shipping } = furnitureData[productIndex];
            setTitle(name.toUpperCase());
            setImageURL(image);
            setPrice(price)
            setBrand(company)
            setShipping(shipping)
        }

        furnitureData && loadProduct();
    }, [furnitureData, productIndex])





    async function rentProduct(e) {
        e.preventDefault();
        let address;
        const rentalTime = e.target[0].value;
        if (checked) {
            const name = e.target[2].value;
            const apartment = e.target[3].value;
            const streetName = e.target[4].value;
            const city = e.target[5].value;
            const zipCode = e.target[6].value;
            address = `${name}, ${apartment}, ${streetName}, ${city}, ${zipCode}`
        } else {
            address = userData.address;
        }
        try {
            const { email } = userData;

            const res = await fetch('/api/order', {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    'id': productIndex.toString(),
                    'email': email,
                    'rentalTime': rentalTime,
                    'address': address,
                    'status': 'In Transit'
                })
            });
            if (res.ok) {
                const Data = await res.json();
                toast.success(Data.message,
                    {
                        autoClose: 1500,
                        position: toast.POSITION.BOTTOM_RIGHT,
                        onClose: () => {
                            setTimeout(() => {
                                window.location.href = '/UserOrders'
                            }, 1500);

                        }
                    })

            } else {
                const Data = await res.json();
                console.log(Data);
                console.error('Request failed with status:', res.status);
                toast.error(Data.message,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    })

            }


        } catch (error) {
            console.error('Error fetching furnitureData:', error);
            toast.error('Please try again later', {
                autoClose: 5000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    };

    return (
        <>
            <div className="productContainer">
                <div className="prodFullImage">
                    <img src={imgURL} alt="Loading..." />
                </div>
                <form id="buyNowForm" onSubmit={rentProduct}>
                    <h1>{Title}</h1>

                    <label htmlFor="">Tenure (in months)</label>
                    <select name="select" id="" defaultValue={1} >
                        <option value="24">24</option>
                        <option value="18">18</option>
                        <option value="12">12</option>
                        <option value="6">06</option>
                        <option value="3">03</option>
                        <option value="1" selected>01</option>
                    </select>
                    <div>
                        <input type="checkbox" id="useDefaultAddress" onChange={() => setChecked(!checked)} />
                        <label htmlFor="useDefaultAddress">use default name and details</label>
                    </div>
                    {checked &&
                        <div id="address">
                            <label htmlFor="">name</label>
                            <input type="text" required />
                            <label htmlFor="">apartment</label>
                            <input type="text" required />
                            <label htmlFor="">street name</label>
                            <input type="text" required />
                            <label htmlFor="">city</label>
                            <input type="text" required />
                            <label htmlFor="">zip code</label>
                            <input type="number" required />
                        </div>
                    }
                    <div className="buttonGroup">
                        <button className="buyBtn" type="button">Cancel</button>
                        <button className="buyBtn" type="submit">Submit</button>
                    </div>
                </form>
                <ToastContainer />

            </div>
        </>
    )
}

export default BuyNow;