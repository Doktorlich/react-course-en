import { createPortal } from "react-dom";
import { forwardRef, useContext, useImperativeHandle, useRef, useActionState } from "react";
import { CartContext } from "../store/CartContext.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation-order.js";
import { postOrder } from "../services/http.js";
import ModalStatus from "./ModalStatus.jsx";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";

const OrderModal = forwardRef(function OrderModal({}, ref) {
    const dialog = useRef();
    const messageModalRef = useRef();
    const { totalAmount, cartProducts, setCartProducts, setTotalAmount } = useContext(CartContext);

    let errors = [];

    async function orderAction(prevState, formData) {
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
            setCartProducts([]);
            setTotalAmount(0);
            handleModalOrderClose();
            handleModalMessageOpen();
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
    function handleModalMessageOpen() {
        messageModalRef.current.open();
    }

    return createPortal(
        <dialog ref={dialog} className={"modal"}>
            <ModalStatus ref={messageModalRef} />
            <h2>Checkout</h2>
            <p>Total Amount: ${totalAmount}</p>
            <form action={formAction}>
                <Input
                    label={"Full Name"}
                    id={"name"}
                    type="text"
                    defaultValue={formState.enteredValues?.name}
                />
                <Input
                    label={"E-Mail Address"}
                    type="email"
                    id={"email"}
                    defaultValue={formState.enteredValues?.email}
                />
                <Input
                    label={"Street"}
                    type="text"
                    id={"street"}
                    defaultValue={formState.enteredValues?.street}
                />

                <div className={"control-row"}>
                    <Input
                        label={"Postal Code"}
                        type="text"
                        id={"postal-code"}
                        defaultValue={formState.enteredValues?.postalCode}
                    />
                    <Input
                        label={"City"}
                        type="text"
                        id={"city"}
                        defaultValue={formState.enteredValues?.city}
                    />
                </div>

                <div className={"modal-actions"}>
                    <Button
                        textOnly
                        onClick={() => {
                            handleModalOrderClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </div>

                {formState.errors && (
                    <div>
                        {formState.errors.map(error => {
                            return (
                                <p key={error} className={"error"}>
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
