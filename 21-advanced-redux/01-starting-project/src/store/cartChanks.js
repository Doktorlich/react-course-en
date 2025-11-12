import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export function fetchCartData() {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-redux-advanced-d3a67-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                { method: "GET" },
            );
            if (!response.ok) {
                throw new Error("Cart data to load  failed");
            }
            const data = await response.json();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            console.error("Error", error);
        }
    };
}

export function sendCartData(cart) {
    return async dispatch => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            }),
        );
        const sendRequest = async () => {
            const response = await fetch(
                "https://react-redux-advanced-d3a67-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (!response.ok) {
                dispatch(
                    uiActions.showNotification({
                        status: "error",
                        title: "Error",
                        message: "Sending cart data failed!",
                    }),
                );
            }
        };
        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success",
                    message: "Send cart data successfully!",
                }),
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error",
                    message: "Sending cart data failed!",
                }),
            );
        }
    };
}
