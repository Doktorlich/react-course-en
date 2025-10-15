import { createContext, forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context.jsx";
import { OrderContext } from "../store/order-context.jsx";
import OrderModal from "./OrderModal.jsx";

const CartModal = forwardRef(function CartModal({}, ref) {
    const dialog = useRef();
    const orderModalRef = useRef();

    const {
        cartProducts,
        totalAmount,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductFromCart,
    } = useContext(CartContext);

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
        orderModalRef.current.open()
    }


    const isCartEmpty =
        cartProducts.length > 0 ? (
            <ul>
                {cartProducts.map(cartProduct => {
                    return (
                        <li key={cartProduct.product.id} className={"cart-item "}>
                            <p>
                                <span>{cartProduct.product.name}</span>
                                <span> - </span>
                                <span>{cartProduct.quantity}</span>
                                <span> x </span>
                                <span>${cartProduct.product.price}</span>
                            </p>
                            <div className={"cart-item-actions"}>
                                <button
                                    onClick={() => {
                                        decreaseProductQuantity(cartProduct.product.id);
                                    }}
                                >
                                    -
                                </button>
                                <span>{cartProduct.quantity}</span>
                                <button
                                    onClick={() => {
                                        increaseProductQuantity(cartProduct.product.id);
                                    }}
                                >
                                    +
                                </button>
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
            <OrderModal ref={orderModalRef}/>
            <div className={"cart"}>
                <h2>Your Cart</h2>
                {isCartEmpty}
                {cartProducts && <p className={"cart-total"}>${totalAmount.toFixed(2)}</p>}
                <div className={"modal-actions"}>
                    <button
                        className={"text-button"}
                        onClick={() => {
                            handleModalCartClose();
                        }}
                    >
                        Close
                    </button>
                    <button
                        className={"button"}
                        onClick={() => {
                            handleModalOrderOpen();
                        }}
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
