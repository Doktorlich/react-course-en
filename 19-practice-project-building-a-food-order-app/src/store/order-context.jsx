import { createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch.js";
import { postOrder } from "../services/http.js";

export const OrderContext = createContext({ submitOrder: () => {} });

export function OrderContextProvider({ children }) {


    const contextValue = {  };

    return <OrderContext.Provider value={contextValue}>{children}</OrderContext.Provider>;
}
