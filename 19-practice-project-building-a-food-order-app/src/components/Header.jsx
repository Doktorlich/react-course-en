import { Fragment, useContext, useRef } from "react";
import CartModal from "./CartModal.jsx";
import logoImage from "../assets/logo.jpg";
import { CartContext } from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import CartAlternate from "./CartAlternate.jsx";
export default function Header() {
    const cartModalRef = useRef();
    const { cartProducts } = useContext(CartContext);
    function handleModalOpen() {
        cartModalRef.current.open();
    }
    return (
        <Fragment>
            <CartModal ref={cartModalRef} />
            {/*<CartAlternate />*/}
            <header id={"main-header"}>
                <h1 id={"title"}>
                    <img className={""} src={logoImage} alt="Logotip" />
                    reactfood
                </h1>

                <Button
                    textOnly
                    type={"button"}
                    onClick={() => {
                        handleModalOpen();
                    }}
                >
                    Cart({cartProducts.length})
                </Button>
            </header>
        </Fragment>
    );
}
