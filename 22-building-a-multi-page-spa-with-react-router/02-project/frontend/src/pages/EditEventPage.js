import { NavLink, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {
    const data = useRouteLoaderData("event-detail");

    return (
        <main className={"content"}>
            <h1>Edit Event page</h1>
            <EventForm event={data.event} method={"PATCH"} />
            <NavLink to={".."} relative={"path"}>
                Back
            </NavLink>
        </main>
    );
}
// export async function action({ request, params }) {
//     const id = params.eventId;
//     const updatedData = await request.formData();
//     console.log("updatedData",updatedData);
//     const data = {
//         title: updatedData.get("title"),
//         image: updatedData.get("image"),
//         date: updatedData.get("date"),
//         description: updatedData.get("description"),
//     };
//     const response = await fetch(`http://localhost:8080/events/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//         throw new Response(JSON.stringify({ message: "Data update error" }), { status: 500 });
//     } else {
//         return redirect("/events");
//     }
// }
