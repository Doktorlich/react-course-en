import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ModalStatus = forwardRef(function ModalStatus({}, ref) {
    const dialog = useRef(null);
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
    function handleModalMessageClose() {
        dialog.current.close();
    }
    return createPortal(
        <dialog ref={dialog} className={"modal"}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back you with more details via email within the next few minutes.</p>
            <div className={"modal-actions"}>

                <button
                    className={"button"}
                    onClick={() => {
                        handleModalMessageClose();
                    }}
                >
                    Okay
                </button>
            </div>
        </dialog>,
        document.getElementById("modal"),
    );
});

export default ModalStatus;
