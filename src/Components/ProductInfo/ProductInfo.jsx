import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../../Data/Product';
import './Productinfo.scss'
import { FaStar, FaStarHalfAlt} from "react-icons/fa";

const Productinfo = () => {
    const [mainImage,setMainImage] = useState(0)
    const { name } = useParams();
    const product = Products.find((prod) =>
        prod.name.toLowerCase() == name.toLowerCase())
  
    return (
        <div className='productinfo'>
            <div class="left">
                <div className='main-img'>
                    <img src={product.image[mainImage]} alt=""/>
                </div>
                <div className='secondary-img'>
                    <img src={product.image[0]} alt="" onClick={()=> setMainImage(0)}/>
                    <img src={product.image[1]} alt="" onClick={()=> setMainImage(1)}/>
                    <img src={product.image[2]} alt="" onClick={()=> setMainImage(2)}/>
                    <img src={product.image[3]} alt="" onClick={()=> setMainImage(3)}/>
                </div>
            </div>
            <div class="right">
                <h1>{product.name}</h1>
                <div className='rating'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar />
                    <FaStarHalfAlt />
                    ({product.rating})
                </div>
                <p className='desc'>{product.description}</p>
                <div className='price'>
                    <p>₹ {product.offerPrice}</p>
                    <p>₹ {product.price}</p>
                </div>
                <div className='btn'>
                    <button>Add To Cart</button>
                    <button>BuyNow</button>
                </div>
            </div>
        </div>
    )
}

export default Productinfo