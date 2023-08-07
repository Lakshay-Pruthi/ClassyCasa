import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Trending from "../components/Trending";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "./Main";
import { registrationContext } from "../App";


function Product() {
    const { loggedIn, setLoggedIn } = useContext(registrationContext);
    const { productIndex } = useParams();
    const { furnitureData } = useContext(MainContext)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productIndex]);

    const [imgURL, setImageURL] = useState(null);
    const [Title, setTitle] = useState('Loading...')
    const [Price, setPrice] = useState('Loading...')
    const [Description, setDescription] = useState('Loading...')
    const [Brand, setBrand] = useState('Loading...')
    const [Shipping, setShipping] = useState('Loading...')



    useEffect(() => {

        function loadProduct() {
            const { name, image, company, price, shipping, description } = furnitureData[productIndex];
            setTitle(name.toUpperCase());
            setImageURL(image);
            setPrice(price)
            setBrand(company)
            setShipping(shipping)
            setDescription(description)
        }

        furnitureData && loadProduct();
    }, [furnitureData, productIndex])





    return (
        <>
            <div className="productContainer" id="prod">
                <div className="prodFullImage">
                    <img src={imgURL} alt="Loading..." />
                </div>
                <div className="prodDetails">
                    <h1 className="heading">{Title}</h1>
                    <p>{Description}</p>
                    <div>
                        <h2>Price: ${Price / 1000}/month</h2>
                        <h3>Brand: {Brand}</h3>
                    </div>
                    {Shipping ?
                        <p>This product is eligible for free shipping.</p>
                        :
                        ""
                    }
                    <div className="buttonGroup">
                        <Link to={`/BuyNow/${productIndex}`}><button className="buyBtn">Rent Now</button></Link>
                        <ToastContainer />
                    </div>
                </div>

            </div>
            <Trending furnitureData={furnitureData} />
        </>
    )
}
export default Product;