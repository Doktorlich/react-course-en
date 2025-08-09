import Input from "./Input.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";

export default function NewProject({ onAddData, onReset, onCancel }) {
    const modalRef = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleDataForm() {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        if (title.trim() === "" || description.trim() === "" || dueDate === "") {
            return modalRef.current.open();
        }
        onAddData({ title: title, description: description, dueDate: dueDate });
        onReset();
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
                        <button className={"text-stone-800 hover:text-stone-950"} onClick={onCancel}>Cancel</button>
                    </li>
                    <li>
                        <button className={"px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"} onClick={handleDataForm}>
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} label={"Title"} type={"text"} />
                    <Input ref={descriptionRef} label={"Description"} textarea type={"text"} />
                    <Input ref={dueDateRef} label={"Due date"} type={"date"} />
                </div>
            </div>
        </>
    );
}
