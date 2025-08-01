// // данный метод использования ref  в виде prop  доступен только в 19й версии реакт
// export default function ResultModal({ result, targetTime, ref }) {
//     return (
//         <dialog ref={ref} className={"result-modal"}>
//             <h2>You {result}</h2>
//             <p>
//                 The target time <strong>{targetTime} seconds.</strong>
//             </p>
//             <p>
//                 You stopped the timer with <strong> X seconds left.</strong>
//             </p>
//             <form method={"dialog"}>
//                 <button>Close</button>
//             </form>
//         </dialog>
//     );
// }

// метод использования ref  в виде prop в react ДО 19й версии

import {createPortal} from "react-dom"

import { forwardRef, useImperativeHandle, useRef } from "react";
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog ref={dialog} className={"result-modal"}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score:{score}</h2>}
            <p>
                The target time <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong> {formattedRemainingTime} seconds left.</strong>
            </p>
            <form method={"dialog"} onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;
