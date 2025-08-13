import { useState } from "react";

export default function EditTask({ task, onCancelEdit, onUpdate, taskId, setEditEdit }) {
    const [updateTask, setUpdateTask] = useState(`${task.text}`);

    function handleChange(event) {
        setUpdateTask(event.target.value);
    }
    function handleSaveTask(taskId, updateTask) {
        onUpdate(taskId, updateTask);
        setEditEdit(prevState => {
            return {
                ...prevState,
                isEdit: false,
            };
        });
    }

    return (
        <div className={"flex justify-between w-full"}>
            <input className={"w-3/4 px-2 py-1 rounded-sm bg-stone-200 "} onChange={handleChange} value={updateTask} />
            <div className={"flex justify-between gap-1 "}>
                <button
                    className={
                        "text-stone-200  px-4 py-1 text-xs md:text-base rounded-md bg-stone-700  hover:bg-stone-600 hover:text-stone-100"
                    }
                    onClick={() => handleSaveTask(taskId, updateTask)}
                >
                    Save
                </button>
                <button className={"text-stone-700 hover:text-red-500"} onClick={onCancelEdit}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
