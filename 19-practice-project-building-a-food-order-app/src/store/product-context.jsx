import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext({
    products: null,
});

export function ProductContextProvider({ children }) {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:3000/meals", { method: "GET" });
            const products = await response.json();
            if (!response.ok) {
                console.error("Не получилось получить данные от серверва");
                return;
            }
            setProducts(products);
        }
        fetchProducts();

    }, []);

    const contextValue = { products: products };

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}
