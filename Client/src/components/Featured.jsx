import { Link } from 'react-router-dom';
import ProductCard from './miniComponents/ProductCard'
import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../Pages/Main';


function Featured() {

    const { furnitureData } = useContext(MainContext);

    const [prod, setProd] = useState(null);

    useEffect(() => {
        function getProducts() {
            let Data = furnitureData.slice(0, 4);
            setProd(Data.map((e, index) => {
                const { id, image } = e;
                return <Link key={index} to={`/ClassyCasa/product/${index}`}><ProductCard ID={id} imgURL={image} /></Link>
            }))
        }
        furnitureData && getProducts();
    }, [furnitureData])

    return (
        <>
            <div className='highlight'>

                <div id='featured'>
                    <h1>Featured Products</h1>

                    <div>
                        {prod}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Featured;