import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ openModal, children }) {
    const dialog = useRef();
    useEffect(() => {
        if (openModal) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [openModal]);

    return createPortal(
        <dialog className="modal" ref={dialog} >
            {openModal ? children : null}
        </dialog>,
        document.getElementById("modal"),
    );
}

export default Modal;
