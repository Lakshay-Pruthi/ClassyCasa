import { Link } from "react-router-dom";

function ProductCard(props) {

    const { Index, ID, imgURL, Title, Price } = props;


    return (

        <div key={Index} id={ID} className="productCard">
            <img className='prodImage' src={imgURL} alt={Title} />
            {Title && Price &&
                <div>
                    <h2>{Title.toUpperCase()}</h2>
                    <p>${Price}</p>
                </div>
            }
        </div>
    )
}

export default ProductCard;