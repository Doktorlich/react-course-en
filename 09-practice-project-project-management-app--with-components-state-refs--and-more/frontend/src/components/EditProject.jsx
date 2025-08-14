import { useEffect, useRef } from "react";
import Modal from "./Modal.jsx";
import Input from "./Input.jsx";
import { useParams } from "react-router-dom";

export default function EditProject({ project, onCancelEditProject,onUpdateProjectData, }) {
    const { projectId } = useParams();

    console.log("project edit", project);
    console.log("projectId edit", projectId);
    const modalRef = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleDataForm(id) {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        if (title.trim() === "" || description.trim() === "" || dueDate === "") {
            return modalRef.current.open();
        }
        onUpdateProjectData({ _id:id,title: title, description: description, dueDate: dueDate });
        onCancelEditProject(id)
    }

    return (
        <>
            <Modal ref={modalRef} buttonCaption={"Okay"}>
                <h2 className={"text-xl font-bold text-stone-700 my-4"}>Invalid input</h2>
                <p className={"text-stone-500 mb-4"}>Ooops ... looks like you forgot to enter a value.</p>
                <p className={"text-stone-500 mb-4"}>Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className={"w-[35rem] mt-16"}>
                <menu className={"flex items-center justify-end gap-4 my-4"}>
                    <li>
                        <button className={"text-stone-800 hover:text-stone-950"} onClick={() => onCancelEditProject(projectId)}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className={"px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"}
                            onClick={() => handleDataForm(projectId)}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} label={"Title"} type={"text"} defaultValue={project.title} />
                    <Input ref={descriptionRef} label={"Description"} textarea type={"text"} defaultValue={project.description} />
                    <Input ref={dueDateRef} label={"Due date"} type={"date"} defaultValue={project.dueDate} />
                </div>
            </div>
        </>
    );
}
