import { Fragment, useRef } from "react";
import Products from "./components/Products.jsx";
import { ProductContextProvider } from "./store/product-context.jsx";
import { CartContextProvider } from "./store/cart-context.jsx";
import Header from "./components/Header.jsx";
import { OrderContextProvider } from "./store/order-context.jsx";
function App() {
    return (
        <Fragment>
            <ProductContextProvider>
                <CartContextProvider>
                    <OrderContextProvider>
                        <Header />
                        <main>
                            <Products />
                        </main>
                    </OrderContextProvider>
                </CartContextProvider>
            </ProductContextProvider>
        </Fragment>
    );
}

export default App;
