import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
    // const hiddenAnimationState = { opacity: 0, y: -300 }
    return createPortal(
        <>
            <div className="backdrop" onClick={onClose} />
            <motion.dialog
                open
                className="modal"
                // позволяет использовать анимации повторно без дублирования кода
                variants={{
                    hidden: { opacity: 0, y: -300 },
                    visible: { opacity: 1, y: 0 },
                }}
                // свойство задает начальное состояние анимации (изначально скрыто)
                initial="hidden"
                // свойство задает поведение анимации,(например появление, движение и тд)
                animate="visible"
                //свойство которое позволяет проигрывать анимацию при удалении компонента из дерева
                exit="hidden"
                // свойство которое задает переход
                transition={{ duration: 0.3 }}
            >
                <h2>{title}</h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById("modal"),
    );
}
