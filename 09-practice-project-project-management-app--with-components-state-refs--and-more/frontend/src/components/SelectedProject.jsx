import Tasks from "./Tasks.jsx";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import { useEffect, useState } from "react";
export default function SelectedProject({ project, onDelete, onDeleteTask, onAddTask, tasks, onSelectProject,onUpdateTask }) {
    const { projectId } = useParams();
    useEffect(() => {
        onSelectProject(projectId);
    }, [projectId]);
    if (!project) {
        return <Loader />;
    }
    const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <div className={"w-[50rem] mt-16"}>
            <header className={"pb-4 mb-4 border-b-2 border-stone-300"}>
                <h1>{projectId}</h1>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-3xl font-bold text-stone-600 mb-2"}>{project.title}</h1>
                    <button className={"text-stone-600 hover:text-stone-950"} onClick={() => onDelete(project._id)}>
                        Delete
                    </button>
                </div>
                <p className={"mb-4 text-stone-400 "}>{formattedDate}</p>
                <p className={"text-stone-600 whitespace-pre-wrap"}>{project.description}</p>
            </header>
            <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} onUpdate={onUpdateTask}/>
        </div>
    );
}
