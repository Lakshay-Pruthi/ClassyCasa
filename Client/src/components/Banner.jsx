import { Link } from 'react-router-dom';
import arrow from './miniComponents/assets/BannerArrow.png'
function Banner(props) {
    const { Title, Image } = props;
    return (
        <>
            <div className='highlight'>
                <div className="Banner">
                    <img className='BannerImage' src={Image} alt="" />
                    <div>
                        <p>Explore our beutifull range of {Title} </p>
                        <Link to={`/Category/${Title}`}>   <button>Explore  <img className='bannerArrow' src={arrow} alt="" /></button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Banner;