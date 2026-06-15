import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  count: number;
}

export interface CartState {
  cartItems: CartItem[];
  cartCount: number;
}

const initialState: CartState = {
  cartItems: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.cartCount += 1;
    },

    incrementCount: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.count += 1;
        state.cartCount += 1;
      }
    },

    decrementCount: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item && item.count > 1) {
        item.count -= 1;
        state.cartCount -= 1;
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item) {
        state.cartCount -= item.count;
      }

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    replaceCart: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.cartItems = action.payload;
      state.cartCount = action.payload.reduce(
        (sum, item) => sum + item.count,
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
    },
  },
});

export const {
  addToCart,
  clearCart,
  incrementCount,
  decrementCount,
  removeFromCart,
  replaceCart,
} = cartSlice.actions;

export default cartSlice.reducer;
