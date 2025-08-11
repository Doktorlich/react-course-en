import Tasks from "./Tasks.jsx";
import { useParams } from "react-router-dom";

export default function SelectedProject({ project, onDelete, onDeleteTask, onAddTask, tasks }) {
    const { projectId } = useParams();
    const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    console.log(project._id);
    return (
        <div className={"w-[35rem] mt-16"}>
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
            <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
        </div>
    );
}
