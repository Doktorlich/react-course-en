import NewTask from "./NewTask.jsx";
import { useState } from "react";
import EditTask from "./EditTask.jsx";

export default function Tasks({
    onAdd,
    onDelete,
    tasks,
    onUpdate,

    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
}) {
    const [editTask, setEditEdit] = useState({ isEdit: false, taskId: undefined });

    function handleStartEdit(id) {
        setEditEdit(prevState => {
            return {
                ...prevState,
                isEdit: true,
                taskId: id,
            };
        });
    }
    function handleCancelEdit() {
        setEditEdit(prevState => {
            return {
                isEdit: false,
                taskId: undefined,
            };
        });
    }
    function previewTask(taskId, text) {
        return (
            <div className={"flex justify-between w-full "}>
                <span className={"w-3/4 my-4 "}>{text}</span>
                <div className={"flex justify-between gap-3 "}>
                    <button className={"text-stone-700 hover:text-red-500"} onClick={() => handleStartEdit(taskId)}>
                        Edit
                    </button>
                    <button className={"text-stone-700 hover:text-red-500"} onClick={() => onDelete(taskId)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section>
            <h2 className={"text- font-bold text-stone-700 mb-4"}>Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasks.length === 0 ? (
                <p className={"text-stone-800 my-4"}>This project does not have any tasks yet.</p>
            ) : (
                <ul className={"flex flex-col gap-2 p-4 mt-8 rounded-md "}>
                    {tasks.map(task => {
                        const isCurrentTaskEditing = editTask.isEdit && editTask.taskId === task._id;
                        const taskToEdit = tasks.find(task => task._id === editTask.taskId);
                        return (
                            <li
                                key={task._id}
                                className={"bg-stone-200 px-2 cursor-move "}
                                draggable={true}
                                onDragStart={event => {
                                    handleDragStart(event, task);
                                }}
                                onDragLeave={event => {
                                    handleDragEnd(event);
                                }}
                                onDragEnd={event => {
                                    handleDragEnd(event);
                                }}
                                onDragOver={event => {
                                    handleDragOver(event);
                                }}
                                onDrop={event => {
                                    handleDrop(event, task, tasks);
                                }}
                            >
                                {isCurrentTaskEditing ? (
                                    <EditTask
                                        task={taskToEdit}
                                        onCancelEdit={() => handleCancelEdit()}
                                        onUpdate={onUpdate}
                                        taskId={editTask.taskId}
                                        setEditEdit={setEditEdit}
                                    />
                                ) : (
                                    previewTask(task._id, task.text)
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
