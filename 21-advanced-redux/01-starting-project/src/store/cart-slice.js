import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { isCart: true, cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        toggle(state) {
            state.isCart = !state.isCart;
        },
        addToCart(state, action) {
            const newItem = action.payload;
            console.log(newItem, "addToCart");
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    quantity: newItem.quantity,
                    total: newItem.total,
                    price: newItem.price,
                });
            } else {
                existingItem.quantity++;
            }
        },
        incrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            }
        },
        decrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem && existingItem.quantity <= 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            }
            existingItem.quantity--;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
