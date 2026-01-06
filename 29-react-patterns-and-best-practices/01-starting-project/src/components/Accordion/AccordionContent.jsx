import { AnimatePresence, motion } from "framer-motion";
import Accordion, { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export default function AccordionContent({ className, children }) {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();
    const isOpen = openItemId === id;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={className}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 130 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    style={{ overflow: "hidden" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
