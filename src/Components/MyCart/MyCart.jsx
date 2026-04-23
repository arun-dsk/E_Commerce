import { useSelector } from 'react-redux'
import Products from '../../Data/Product'
import './MyCart.scss'
import { HashLink } from 'react-router-hash-link'
import { useDispatch } from 'react-redux'
import { incrementCount,decrementCount } from '../../redux/cartReducer'
import { useMemo, useState } from 'react'
import Popup from '../Popup/Popup'

const MyCart = () => {
    
    const dispatch = useDispatch()
    const [popupPage, setPopupPage] = useState(false)
    const [removeItem,setRemoveItem] = useState(null)

    const { cartItems, cartCount } = useSelector((state) => state.Cart)
    const cart = cartItems.map(item => {const product = Products.find(prod => prod.id === item.id)
        return { ...product, count: item.count }
    })

    const onRemove = (item) => {
        setPopupPage(true);
        setRemoveItem(item)
    }

    const totalActualPrice = useMemo(() => {
        return cart.reduce((x,y)=> x+ y.price * y.count, 0 )
    }, [cart])
    
    const totalOfferPrice = useMemo(() => {
        return cart.reduce((x,y)=> x+ y.offerPrice * y.count, 0 )
    },[cart])

    if (cartCount == 0) {
        return (
            <div className="emptycart">
                <h2>Your Cart Is Empty</h2>
                <HashLink smooth to="/#Products"
                    className='button'>
                    Purchase Now
                </HashLink>
            </div>
        )
    }

    return (
        <div className='cartpage'>
            <h2>Your Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ProductName</th>
                        <th>Quantity</th>
                        <th>ActualPrice</th>
                        <th>OfferPrice</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.image[0]}alt="" /></td>
                            <td>{item.name}</td>

                            <td className='count'>
                                <div className='btns'>
                                    <button onClick={() =>
                                        dispatch(decrementCount(item.id))}
                                    >-
                                    </button>
                                    <p>{item.count}</p>
                                    <button onClick={() =>
                                        dispatch(incrementCount(item.id))}
                                    >+
                                    </button>
                                </div>
                            </td>

                            <td>₹ {item.price * item.count}</td>
                            <td>₹ {item.offerPrice * item.count}</td>
                            <td onClick={()=>onRemove(item.id)} className='remove'>remove ❌</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3"></td>
                        <td>Total Actual Price: ₹ {totalActualPrice}</td>
                        <td>Total Offer Price: ₹ {totalOfferPrice}</td>
                        <td>You Saved: ₹ {totalActualPrice - totalOfferPrice}</td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                        <td><button>Add Coupon</button></td>
                        <td><button>Buy Now</button></td>
                    </tr>
                </tbody>
            </table>
            {popupPage && <Popup close={() => setPopupPage(false)}
                removeitem={removeItem} />}
        </div>
    )
}

export default MyCart