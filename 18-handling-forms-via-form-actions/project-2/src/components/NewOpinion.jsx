import { useActionState } from "react";
import { hasMinLength, isNotEmpty } from "../util/validationForm.js";

export function NewOpinion() {
    function shareOpinionAction(prevState, formData) {
        const userName = formData.get("userName");
        const title = formData.get("title");
        const userOpinion = formData.get("body");

        let errors = [];
        if (!isNotEmpty(userName) || !hasMinLength(userName, 5)) {
            errors.push(` You must provide a USER NAME with at least five characters`);
        }
        if (!isNotEmpty(title) || !hasMinLength(title, 5)) {
            errors.push(` You must provide a TITLE with at least five characters`);
        }
        if (!isNotEmpty(userOpinion) || !hasMinLength(userOpinion, 5)) {
            errors.push(` You must provide a OPINION with at least five characters`);
        }

        if (errors.length > 0) {
            return {
                errors: errors,
                enteredValue: { userName: userName, title: title, userOpinion: userOpinion },
            };
        }

        return { errors: null };
    }

    const [formState, formAction] = useActionState(shareOpinionAction, { errors: null });
    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={formAction}>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            defaultValue={formState.enteredValue?.userName}
                        />
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={formState.enteredValue?.title}
                        />
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={5}
                        defaultValue={formState.enteredValue?.userOpinion}
                    ></textarea>
                </p>
                <ul className={"errors"}>
                    {formState.errors &&
                        formState.errors.map(error => {
                            return <li key={error}>{error}</li>;
                        })}
                </ul>
                <p className="actions">
                    <button type="submit">Submit</button>
                </p>
            </form>
        </div>
    );
}
