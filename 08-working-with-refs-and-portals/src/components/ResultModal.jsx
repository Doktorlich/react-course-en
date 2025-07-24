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
import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    return (
        <dialog ref={ref} className={"result-modal"}>
            <h2>You {result}</h2>
            <p>
                The target time <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong> X seconds left.</strong>
            </p>
            <form method={"dialog"}>
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;
