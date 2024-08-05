import { useParams } from 'react-router-dom';
import ProductCard from '../components/miniComponents/ProductCard';
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from './Main';

function Category() {

    const { type } = useParams();
    const { furnitureData } = useContext(MainContext)
    const [productList, setProductList] = useState(null);


    useEffect(() => {
        function getProducts() {
            setProductList(furnitureData.map((e, index) => {
                const { id, image, name, price, category } = e;
                if (category == type.toLowerCase())
                    return <Link to={`/product/${index}`}><ProductCard Index={index} ID={id} imgURL={image} Title={name} Price={price} /></Link>
            }))
        }
        furnitureData && getProducts();
    }, [furnitureData, type])


    return (
        <>
            <h1 className='heading'>{type}</h1>
            <div className='productList'>
                {productList}
            </div>
        </>
    )
}

export default Category;