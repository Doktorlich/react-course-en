interface Todo {
    id: string;
    text: string;
}

export function createTodo(todoText: string): Todo {
    return {
        text: todoText,
        id: new Date().toISOString()+ Math.random(),
    };
}

export default Todo;
