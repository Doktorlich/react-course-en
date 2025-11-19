import { NavLink } from "react-router-dom";

export default function EditEventPage() {
    return (
        <main className={"content"}>
            <h1>Edit Event page</h1>
            <NavLink to={".."} relative={"path"}>
                Back
            </NavLink>
        </main>
    );
}
