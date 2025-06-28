import { useState } from "react";

export default function Player({ name: initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleClickedButton() {
        setIsEditing(editing => !editing);
    }

    function handleChange(event){
        console.log(event.target.value);
        setPlayerName(event.target.value)

    }

    let toggleInputSpan = !isEditing ? (
        <span className={"player-name"}>{playerName}</span>
    ) : (
        <input type="text" required value={playerName} onChange={handleChange}/>
    );
    let btnCaption = isEditing ? "Save" : "Edit";
    return (
        <li className={isActive ? "active" : ""}>
            <span className={"player"}>
                {toggleInputSpan}
                <span className={"player-symbol"}>{symbol}</span>
            </span>
            <button onClick={handleClickedButton}>{btnCaption}</button>
        </li>
    );
}
