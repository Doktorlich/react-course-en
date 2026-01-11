import React from "react";

import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
    text: string;
    onRemoveItem: () => void;
}> = props => {
    return (
        <li className={classes.item} onClick={props.onRemoveItem}>
            {props.text}
        </li>
    );
};
export default TodoItem;
