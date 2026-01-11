import React, { createContext, PropsWithChildren, useState } from "react";
import Todo, { createTodo } from "../models/todo.model";

type TodosContextObject = {
    items: Todo[];
    addTodo: (text:string) => void;
    removeItem: (id: string) => void;
};

export const TodosContext = createContext<TodosContextObject>({
    items: [],
    addTodo: () => {},
    removeItem: (id: string) => {},
});

const TodosContextProvider: React.FC<PropsWithChildren> = props => {
    const [todos, setTodos] = useState<Todo[]>([]);

    function handleRemoveItem(id: string) {
        setTodos(prevState => prevState.filter(item => item.id !== id));
    }

    function handleAddTodo(text: string) {
        const newTodo = createTodo(text);
        setTodos(prevTodos => {
            return prevTodos.concat(newTodo);
        });
    }
    const contextValue: TodosContextObject = {
        items: todos,
        addTodo: handleAddTodo,
        removeItem: handleRemoveItem,
    };

    return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>;
};

export default TodosContextProvider