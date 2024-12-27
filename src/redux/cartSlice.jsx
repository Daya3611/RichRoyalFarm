import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage or set to empty array if not present
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart(state, action) {
      state.push(action.payload);
    },

    // Remove item from cart
    deleteFromCart(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },

    // Update item quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;  // Update the quantity
      }
    },
  }
});

// Export actions
export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
