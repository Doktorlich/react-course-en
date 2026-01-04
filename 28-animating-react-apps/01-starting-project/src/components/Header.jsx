import { useState } from "react";

import NewChallenge from "./NewChallenge.jsx";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

    function handleStartAddNewChallenge() {
        setIsCreatingNewChallenge(true);
    }

    function handleDone() {
        setIsCreatingNewChallenge(false);
    }

    return (
        <>
            {/* из-за того что компонент удаляется мгновенно из дерева, FM неуспивает вопроизвести анимацию*/}
            {/*  поэтому на помощь, приходит специальный компонент*/}
            <AnimatePresence>
                {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
            </AnimatePresence>
            {/* набор свойств начинающийся на while представляет собой,
                поведение обьектов взависимости от взаимодейтсвия пользователя с этим объектом */}
            <header id="main-header">
                <h1>Your Challenges</h1>
                <motion.button
                    onClick={handleStartAddNewChallenge}
                    className="button"
                    // whileHover={{ scale: 1.1 , backgroundColor:"#8b11f0"}}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    Add Challenge
                </motion.button>
            </header>
        </>
    );
}
