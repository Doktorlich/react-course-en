import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { cartItems: [], changed: false };

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        replaceCart(state, action) {
            state.cartItems = action.payload.cartItems;
        },
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            state.changed = true;
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
            state.changed = true;
            if (existingItem) {
                existingItem.quantity++;
            }
        },
        decrementQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            state.changed = true;
            if (existingItem && existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            }
            existingItem.quantity--;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
