import { Fragment, useContext, useRef } from "react";
import CartModal from "./CartModal.jsx";
import logoImage from "../assets/logo.jpg";
import { CartContext } from "../store/cart-context.jsx";
export default function Header() {
    const cartModalRef = useRef();
    const {cartProducts} = useContext(CartContext)
    function handleModalOpen() {
        cartModalRef.current.open();
    }
    return (
        <Fragment>
            <CartModal ref={cartModalRef} />
            <header id={"main-header"}>
                <h1 id={"title"}>
                    <img className={""} src={logoImage} alt="Logotip" />
                    reactfood
                </h1>

                <button
                    className={"text-button "}
                    type={"button"}
                    onClick={() => {
                        handleModalOpen();
                    }}
                >
                    Cart({cartProducts.length})
                </button>
            </header>
        </Fragment>
    );
}
