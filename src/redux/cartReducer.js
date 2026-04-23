import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    cartCount: 0,
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload
            const existingItem = state.cartItems.find(
                item => item.id === newItem.id)
            if (!existingItem) {
                state.cartItems.push(newItem)
                state.cartCount += 1
            }

        },
        incrementCount: (state, action) => {
            const itemId = action.payload
            const item = state.cartItems.find(item => 
                item.id == itemId)
            if (item) {
                item.count++
            }
        },
        decrementCount: (state,action) => {
            const itemId = action.payload
            const item = state.cartItems.find(item => 
                item.id == itemId)
            if (item && item.count > 1) {
                item.count--
            }
        },
        removeFromCart: (state,action) => {
            // console.log("Cart item removed",action.payload)
            const itemId = action.payload
            const existingItem = state.cartItems.find(
                item => item.id === itemId)
            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => 
                    item.id !== itemId)
                state.cartCount = state.cartItems.length
            }

        }
    }
})

export const {
    addToCart,
    incrementCount,
    decrementCount,removeFromCart
}
    = cartSlice.actions

export default cartSlice.reducer;