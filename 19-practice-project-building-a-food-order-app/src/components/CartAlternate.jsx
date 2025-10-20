import { useContext, useRef } from "react";
import { CartContext } from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import OrderModal from "./OrderModal.jsx";

export default function CartAlternate({}) {
    const { cartProducts, totalAmount, increaseProductQuantity, decreaseProductQuantity } =
        useContext(CartContext);
    const orderModalRef = useRef();
    const isProducts = cartProducts.length > 0;
    const isCartEmpty =
        cartProducts.length > 0 ? (
            <ul>
                {cartProducts.map(cartProduct => {
                    const { id, name, price } = cartProduct.product;
                    return (
                        <li key={id} className={"cart-item "}>
                            <p>
                                <span>{name}</span>
                                <span> - </span>
                                <span>{cartProduct.quantity}</span>
                                <span> x </span>
                                <span>${price}</span>
                            </p>
                            <div className={"cart-item-actions"}>
                                <Button textOnly onClick={() => decreaseProductQuantity(id)}>
                                    -
                                </Button>
                                <span>{cartProduct.quantity}</span>
                                <Button textOnly onClick={() => increaseProductQuantity(id)}>
                                    +
                                </Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>Cart is empty...</p>
        );


    function handleModalOrderOpen() {
        orderModalRef.current.open();
    }
    return (
        <Modal open classNme={"modal"}>
            <OrderModal ref={orderModalRef} />
            <div className={"cart"}>
                <h2>Your Cart</h2>
                {isCartEmpty}
                {cartProducts && totalAmount > 0 && (
                    <p className={"cart-total"}>${totalAmount.toFixed(2)}</p>
                )}
                <div className={"modal-actions"}>
                    <Button textOnly>
                        Close
                    </Button>
                    <Button onClick={() => handleModalOrderOpen()} disabled={!isProducts}>
                        Go to Checkout
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
