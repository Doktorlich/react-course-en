import { useState } from "react";
import Output from "./Output";

export default function Greeting() {
    const [changeText, setChangeText] = useState(false);
    function handleChangeText(){
        setChangeText(true)
    }

    return (
        <div>
            <h2>Hello World!</h2>
            {!changeText && <Output>It's good to see you!</Output>}
            {changeText && <Output>Changed!</Output>}
            <button onClick={handleChangeText}>Change Text!</button>
        </div>
    );
}
