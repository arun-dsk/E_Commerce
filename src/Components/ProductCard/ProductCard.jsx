import React from 'react'
import './ProductCard.scss'
import { FaStar,FaStarHalfAlt } from "react-icons/fa";
import { addToCart } from '../../redux/cartReducer'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({id, name, image, Offerprice, Actualprice }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector((state) => state.Cart)
    const isInCart = cartItems.find(item=> item.id === id )

    const onAddtoCart = () => {
        try {
            dispatch(addToCart({ "id": id, "name": name, "count": 1 }))
            toast.success("Add To Cart Successfull")
        }
        catch (error) {
            toast.error("Failed....! Please Try Again")
        }
    }

    return (
        <div className='product'>
            <div className='imgbox'
                onClick={()=> navigate(`/product/${name}`)}
            >
                    <img src={image[0]} alt="" />
                </div>
                <div className='info'>
                    <p>{name}</p>
                    <span>
                        <p>₹{Offerprice}</p>
                        <p>₹{Actualprice}</p>
                    </span>
            </div>
            <div className='ratings'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar />
                <FaStarHalfAlt/>
            </div>
                <div className='btns'>
                <button
                    className={isInCart ? "disabled" : ""}
                    onClick={onAddtoCart}>
                    AddToCart</button>
                    <button>BuyNow</button>
                </div>
            </div>
    )
}

export default ProductCard