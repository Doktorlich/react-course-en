import Button from "./Button.jsx";
import noProjectImage from "../assets/no-projects.png"
export default function NoProjectSection({onAddProject}) {
    return (
        <article className={"mt-24 text-center w-2/3"}>
            <img src={noProjectImage} alt="An empty task list" className={"w-16 h-16 object-contain mx-auto"} />
            <h2 className={"text-xl font-bold text-stone-500 my-4"}>No Project Section</h2>
            <p className={"text-stone-400 mb-4"}>Select a project or get started with a new one</p>
            <p className={"mt-8"}>
                <Button onClick={onAddProject}>Create new project</Button>
            </p>
        </article>
    );
}
