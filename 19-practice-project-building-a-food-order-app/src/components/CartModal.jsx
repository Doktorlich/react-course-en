import { createContext, forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context.jsx";

import OrderModal from "./OrderModal.jsx";

const CartModal = forwardRef(function CartModal({}, ref) {
    const dialog = useRef();
    const orderModalRef = useRef();

    const { cartProducts, totalAmount, increaseProductQuantity, decreaseProductQuantity } =
        useContext(CartContext);

    console.log("products cart", cartProducts);
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    function handleModalCartClose() {
        dialog.current.close();
    }
    function handleModalOrderOpen() {
        orderModalRef.current.open();
        handleModalCartClose();
    }

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
                                <button onClick={() => decreaseProductQuantity(id)}>-</button>
                                <span>{cartProduct.quantity}</span>
                                <button onClick={() => increaseProductQuantity(id)}>+</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>Cart is empty...</p>
        );

    return createPortal(
        <dialog ref={dialog} className={"modal"}>
            <OrderModal ref={orderModalRef} />
            <div className={"cart"}>
                <h2>Your Cart</h2>
                {isCartEmpty}
                {cartProducts && totalAmount > 0 && (
                    <p className={"cart-total"}>${totalAmount.toFixed(2)}</p>
                )}
                <div className={"modal-actions"}>
                    <button className={"text-button"} onClick={() => handleModalCartClose()}>
                        Close
                    </button>
                    <button
                        className={"button"}
                        onClick={() => handleModalOrderOpen()}
                        disabled={!isProducts}
                    >
                        Go to Checkout
                    </button>
                </div>
            </div>
        </dialog>,
        document.getElementById("modal"),
    );
});
export default CartModal;
