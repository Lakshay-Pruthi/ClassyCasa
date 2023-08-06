import { useParams } from 'react-router-dom';
import ProductCard from '../components/miniComponents/ProductCard';
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from './Main';

function Category() {

    const { type } = useParams();
    const { furnitureData } = useContext(MainContext)
    const [prod, setProd] = useState(null);


    useEffect(() => {
        function getProducts() {
            setProd(furnitureData.map((e, index) => {
                const { id, image, name, price, category } = e;
                if (category == type.toLowerCase())
                    return <Link to={`/ClassyCasa/product/${index}`}><ProductCard Index={index} ID={id} imgURL={image} Title={name} Price={price} /></Link>
            }))
        }
        furnitureData && getProducts();
    }, [furnitureData, type])


    return (
        <>
            <h1 className='heading'>{type}</h1>
            <div className='productList'>
                {prod}
            </div>
        </>
    )
}

export default Category;