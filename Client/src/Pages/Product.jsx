import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Trending from "../components/Trending";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "./Main";


function Product() {
    const { productIndex } = useParams();
    const { furnitureData } = useContext(MainContext)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productIndex]);



    const [product, setProduct] = useState({
        title: null,
        imageURL: null,
        price: null,
        description: null,
        brand: null,
        shipping: null
    })



    useEffect(() => {
        function loadProduct() {
            const { name, image, company, price, shipping, description } = furnitureData[productIndex];
            setProduct({
                title: name,
                imageURL: image,
                price: price,
                description: description,
                brand: company,
                shipping: shipping
            })
        }
        furnitureData && loadProduct();
    }, [furnitureData, productIndex])





    return (
        <>
            <div className="productContainer" id="prod">
                <div className="prodFullImage">
                    <img src={product.imageURL} alt="Loading..." />
                </div>
                <div className="prodDetails">
                    <h1 className="heading">{product.title}</h1>
                    <p>{product.description}</p>
                    <div>
                        <h2>Price: ${product.price}/month</h2>
                        <h3>Brand: {product.brand}</h3>
                    </div>
                    {product.shipping &&
                        <p>This product is eligible for free shipping.</p>
                    }
                    <div className="buttonGroup">
                        <Link to={`/checkout/${productIndex}`}><button className="buyBtn">Rent Now</button></Link>
                        <ToastContainer />
                    </div>
                </div>

            </div>
            <Trending furnitureData={furnitureData} />
        </>
    )
}
export default Product;