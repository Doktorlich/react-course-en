import { createContext, useContext } from "react";

export const OrderContext = createContext({ submitOrder: () => {} });

export function OrderContextProvider({ children }) {
    async function submitOrder(enteredDataOrder) {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enteredDataOrder),
        });
        if (!response.ok) {
            return;
        }
    }

    const contextValue = { submitOrder };

    return <OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>;
}
