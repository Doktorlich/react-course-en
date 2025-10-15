import { createPortal } from "react-dom";
import { createContext, forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { CartContext } from "../store/cart-context.jsx";

const OrderModal = forwardRef(function OrderModal({}, ref) {
    const dialog = useRef();
    const { totalAmount } = useContext(CartContext);
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
    function handleModalOrderClose() {
        dialog.current.close();
    }
    return createPortal(
        <dialog ref={dialog} className={"modal"}>
            <h2>Checkout</h2>
            <p>Total Amount: ${totalAmount}</p>
            <form action={""}>
                <div className={"control"}>
                    <label htmlFor={"name"}>Full Name</label>
                    <input type="text" name={"name"} id={"name"} />
                </div>
                <div className={"control"}>
                    <label htmlFor={"email"}>E-Mail Address</label>
                    <input type="email" name={"email"} id={"email"} />
                </div>
                <div className={"control"}>
                    <label htmlFor="street">Street</label>
                    <input type="text" name={"street"} id={"street"} />
                </div>
                <div className={"control-row"}>
                    <div className={"control"}>
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" name={"postal-code"} id={"postal-code"} />
                    </div>
                    <div className={"control"}>
                        <label htmlFor="city">City</label>
                        <input type="text" name={"city"} id={"city"} />
                    </div>
                </div>

                <div className={"modal-actions"}>
                    <button type={"button"}
                        className={"text-button"}
                        onClick={() => {
                            handleModalOrderClose();
                        }}
                    >
                        Close
                    </button>
                    <button className={"button"}>Submit Order</button>
                </div>
            </form>
            ;
        </dialog>,
        document.getElementById("modal"),
    );
});

export default OrderModal;
