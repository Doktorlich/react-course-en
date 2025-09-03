import { useEffect, useState } from "react";

export default function ProgressBar({ onTimeout, timeout, mode}) {
    const [remainingTimeQuestion, setRemainingTimeQuestion] = useState(timeout);
    useEffect(() => {
        console.log("TIMEOUT ON");
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer);
            console.log("TIMEOUT CLEAR");
        };
    }, [onTimeout, timeout]);

    useEffect(() => {
        console.log("INTERVAL CLEAR");
        const interval = setInterval(() => {
            setRemainingTimeQuestion(prevRemainingTimeQuestion => prevRemainingTimeQuestion - 10);
        }, 10);
        return () => {
            clearInterval(interval);
            console.log("INTERVAL CLEAR");
        };
    }, []);
    return <progress id={"question-bar"} value={remainingTimeQuestion} max={timeout} className={mode}/>;
}
