import { createContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

import { fetchProducts } from "../services/http.js";
export const ProductContext = createContext({
    products: null,
    isFetching: true,
    error: null,
});

export function ProductContextProvider({ children }) {


    const { isFetching, setIsFetching, error, setFetchedData, fetchedData } = useFetch(
        fetchProducts,
        [],
    );

    const contextValue = {
        products: fetchedData,
        isFetching,
        setIsFetching,
        error,
        setFetchedData,
    };

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}
