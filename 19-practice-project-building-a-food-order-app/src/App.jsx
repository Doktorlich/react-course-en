import { Fragment, useRef } from "react";
import Products from "./components/Products.jsx";
import { ProductContextProvider } from "./store/product-context.jsx";
import { CartContextProvider } from "./store/cart-context.jsx";
import Header from "./components/Header.jsx";
function App() {
    return (
        <Fragment>
            <ProductContextProvider>
                <CartContextProvider>
                    <Header />
                    <main>
                        <Products />
                    </main>
                </CartContextProvider>
            </ProductContextProvider>
        </Fragment>
    );
}

export default App;
