import { createContext, useContext, useState } from "react";

import AccordionItem from "./AccordionItem.jsx";
import AccordionTitle from "./AccordionTitle.jsx";
import AccordionContent from "./AccordionContent.jsx";
const AccordionContext = createContext();

export function useAccordionContext() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion-related components must be wrapped by <Accordion>");
    }
    return context;
}

export default function Accordion({ children, className, ...props }) {
    const [openItemId, setOpenItemId] = useState(null);



    function toggleItem(id) {
        setOpenItemId(prevState => {
            return prevState === id ? null : id;
        });
    }

    const contextValue = {
        openItemId: openItemId,
        toggleItem: toggleItem,
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={className} {...props}>
                {children}
            </ul>
        </AccordionContext.Provider>
    );
}


Accordion.Item = AccordionItem
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;