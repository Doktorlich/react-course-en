import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/auth-slice";
import counterReducer from "../store/counter-slice";

const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer },
});




export default store;
