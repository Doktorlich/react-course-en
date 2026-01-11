import React, { useContext } from "react";

import TodoItem from "./TodoItem";

import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

const Todos: React.FC = props => {
    const { items, removeItem } = useContext(TodosContext);
    return (
        <ul className={classes.todos}>
            {items.map(item => (
                <TodoItem
                    key={item.id}
                    text={item.text}
                    onRemoveItem={removeItem.bind(null, item.id)}
                />
            ))}
        </ul>
    );
};

export default Todos;
