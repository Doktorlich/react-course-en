import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ProductContext } from "./product-context.jsx";

export const CartContext = createContext({
    cartProducts: null,
    totalAmount: 0,

    addProductToCart: id => {},
    removeProductFromCart: id => {},
    increaseProductQuantity: id => {},
    decreaseProductQuantity: id => {},
});

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        const newTotalAmount = cartProducts.reduce((acc, curValue) => {
            return acc + curValue.product.price * curValue.quantity;
        }, 0);
        setTotalAmount(newTotalAmount);
    }, [cartProducts]);

    function addProductToCart(id) {
        const productToAdd = products.find(product => product.id === id);
        setCartProducts(prevProducts => {
            const existingProduct = prevProducts.find(item => item.product.id === id);
            console.log("existingProduct", existingProduct);
            if (existingProduct) {
                return prevProducts.map(item => {
                    return item.product.id === id
                        ? { ...item, quantity: +item.quantity + +1 }
                        : item;
                });
            } else {
                return [...prevProducts, { product: productToAdd, quantity: 1 }];
            }
        });
    }



    //фактически нет удаления кнопки если смотреть на первоначальный дизайн,
    // скорее всего удаление товара из корзины , происходит при уменьшении количества товаров до нуля
    function removeProductFromCart(id) {}

    const increaseProductQuantity = useCallback(function increaseProductQuantity(id) {
        setCartProducts(prevProducts => {
            return prevProducts.map(item => {
                return item.product.id === id ? { ...item, quantity: +item.quantity + +1 } : item;
            });
        });
    }, []);

    const decreaseProductQuantity = useCallback(function decreaseProductQuantity(id) {
        setCartProducts(prevProducts => {
            return prevProducts
                .map(item => {
                    if (item.product.id !== id) {
                        return item;
                    }
                    const newQty = item.quantity - 1;
                    if (newQty <= 0) {
                        return null;
                    }
                    return { ...item, quantity: newQty };
                })
                .filter(item => item !== null);
        });
        console.log(cartProducts);
    }, []);
    const contextValue = {
        cartProducts: cartProducts,
        totalAmount,

        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
    };
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
