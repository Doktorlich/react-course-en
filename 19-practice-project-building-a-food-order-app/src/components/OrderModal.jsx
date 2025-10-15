import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";

export default function OrderModal({}) {
    const dialog = useRef()
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
    return createPortal(
        <dialog ref={dialog}>
            <form>

            </form>;
        </dialog>,
    )
}