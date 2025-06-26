import { useState } from "react";

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);
    function handleClickedButton() {
        setIsEditing(true);
    }
    return (
        <li>
            <span className={"player"}>
                {!isEditing ? <span className={"player-name"}>{name}</span> : <input type="text" required />}
                <span className={"player-symbol"}>{symbol}</span>
            </span>
            <button onClick={handleClickedButton}>Edit</button>
        </li>
    );
}
