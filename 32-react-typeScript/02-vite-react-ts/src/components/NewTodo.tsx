import React, { useContext, useRef } from "react";

import classes from "./NewTodo.module.css";
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = props => {
    const todoInputRef = useRef<HTMLInputElement>(null);
    const { addTodo } = useContext(TodosContext);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const enteredText = todoInputRef.current!.value;
        if (enteredText.trim().length === 0) {
            return;
        }
        addTodo(enteredText);
        todoInputRef.current!.value = "";
        todoInputRef.current!.focus();
    }
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <label>Type text</label>
            <input ref={todoInputRef} type="text" />
            <button>Add Todo</button>
        </form>
    );
};
export default NewTodo;
