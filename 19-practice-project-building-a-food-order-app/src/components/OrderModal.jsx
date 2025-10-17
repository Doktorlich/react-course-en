import { createPortal } from "react-dom";
import { forwardRef, useContext, useImperativeHandle, useRef, useActionState } from "react";
import { CartContext } from "../store/cart-context.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation-order.js";
import { postOrder } from "../services/http.js";

const OrderModal = forwardRef(function OrderModal({}, ref) {
    const dialog = useRef();
    const { totalAmount, cartProducts,setCartProducts, setTotalAmount } = useContext(CartContext);

    async function orderAction(prevState, formData) {
        let errors = [];
        const email = formData.get("email");
        const name = formData.get("name");
        const street = formData.get("street");
        const postalCode = formData.get("postal-code");
        const city = formData.get("city");

        if (!isEmail(email)) {
            errors.push("Invalid email address.");
        }
        if (!hasMinLength(email, 5)) {
            errors.push("You must provide a mail with at least five characters.");
        }

        if (!isNotEmpty(name)) {
            errors.push("Please provide both your full name.");
        }
        if (!isNotEmpty(street)) {
            errors.push("Please provide both your street.");
        }
        if (!isNotEmpty(city)) {
            errors.push("Please provide both your city.");
        }
        if (!hasMinLength(postalCode, 6)) {
            errors.push("You must provide a Postal Code with at least six characters.");
        }

        if (errors.length > 0) {
            return {
                errors: errors,
                enteredValues: {
                    email: email,
                    name: name,
                    street: street,
                    postalCode: postalCode,
                    city: city,
                },
            };
        }
        try {
            await postOrder(
                {
                    email: email,
                    name: name,
                    street: street,
                    postalCode: postalCode,
                    city: city,
                },
                cartProducts,
            );
            setCartProducts([])
            setTotalAmount(0)
            handleModalOrderClose();
            return { errors: null };
        } catch (error) {
            alert("Failed to submit order. Please try again.");
            return {
                errors: ["Failed to submit order. Please try again."],
                enteredValues: { email, name, street, postalCode, city },
            };
        }
    }

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

    const [formState, formAction] = useActionState(orderAction, { errors: null });

    function handleModalOrderClose() {
        dialog.current.close();
    }

    return createPortal(
        <dialog ref={dialog} className={"modal"}>
            <h2>Checkout</h2>
            <p>Total Amount: ${totalAmount}</p>
            <form action={formAction}>
                <div className={"control"}>
                    <label htmlFor={"name"}>Full Name</label>
                    <input
                        type="text"
                        name={"name"}
                        id={"name"}
                        defaultValue={formState.enteredValues?.name}
                    />
                </div>
                <div className={"control"}>
                    <label htmlFor={"email"}>E-Mail Address</label>
                    <input
                        type="email"
                        name={"email"}
                        id={"email"}
                        defaultValue={formState.enteredValues?.email}
                    />
                </div>
                <div className={"control"}>
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        name={"street"}
                        id={"street"}
                        defaultValue={formState.enteredValues?.street}
                    />
                </div>
                <div className={"control-row"}>
                    <div className={"control"}>
                        <label htmlFor="postal-code">Postal Code</label>
                        <input
                            type="text"
                            name={"postal-code"}
                            id={"postal-code"}
                            defaultValue={formState.enteredValues?.postalCode}
                        />
                    </div>
                    <div className={"control"}>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name={"city"}
                            id={"city"}
                            defaultValue={formState.enteredValues?.city}
                        />
                    </div>
                </div>

                <div className={"modal-actions"}>
                    <button
                        type={"button"}
                        className={"text-button"}
                        onClick={() => {
                            handleModalOrderClose();
                        }}
                    >
                        Close
                    </button>
                    <button className={"button"}>Submit Order</button>
                </div>

                {formState.errors && (
                    <div>
                        {formState.errors.map(error => {
                            return (
                                <p key={error} className={"error"}>
                                    {" "}
                                    {error}
                                </p>
                            );
                        })}
                    </div>
                )}
            </form>
        </dialog>,
        document.getElementById("modal"),
    );
});

export default OrderModal;
