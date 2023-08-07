import { useState, useEffect, useContext } from "react";
import ProductCard from './miniComponents/ProductCard'
import { Link } from "react-router-dom";
import { MainContext } from "../Pages/Main";


function AllProducts(props) {
    const { furnitureData } = useContext(MainContext);
    const { From, To } = props;
    const [prod, setProd] = useState(null);

    useEffect(() => {
        function getProducts() {
            let data = furnitureData.slice(From, To);
            setProd(data.map((e, index) => {
                index = From + index;
                const { id, image, name, price } = e;
                return <Link to={`/product/${index}`}><ProductCard Key={index} Index={index} ID={id} imgURL={image} Title={name} Price={price} /></Link>
            }))
        }
        furnitureData && getProducts();
    }, [furnitureData])


    return (
        <>

            <div className="productList">
                {prod}
            </div>
        </>
    )
}
export default AllProducts;