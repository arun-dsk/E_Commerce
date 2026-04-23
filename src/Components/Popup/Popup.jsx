import React from 'react'
import './Popup.scss'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/cartReducer'

const Popup = ({ close, removeitem }) => {
    
    const dispatch = useDispatch()

    const removeCart = () => {
        dispatch(removeFromCart(removeitem))
        close()
    }

    return (
        <div className='popup'>
            <div className="box">
                <p>Do You Want to Remove From Cart</p>
                <div className='btns'>
                    <button
                        onClick={removeCart}                        
                    >Confirm</button>
                    <button
                        onClick={close}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Popup