import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

function EventsPage() {
    const data = useLoaderData();
    // if (data.isError) {
    //     return <p>{data.message}</p>;
    // }
    return <>{<EventsList events={data} />}</>;
}

export default EventsPage;

export async function loader() {
    const response = await fetch("http://localhost:8080/events", {
        method: "GET",
    });

    if (!response.ok) {
        // return { isError: true, message: "Could not fetch events." };
        throw new Response(JSON.stringify({ message: "Could not fetch event" }), { status: 500 });
        // deprecated
        // throw json({message: "Could not fetch events."})
    } else {
        return response;
    }
}
