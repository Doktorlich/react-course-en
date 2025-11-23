import EventsList from "../components/EventsList";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function EventsPage() {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: "center", color: "red" }}>Loading...</p>}>
            <Await resolve={events}>
                {async loadedEvents => {
                    return <EventsList events={loadedEvents} />;
                }}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

async function loadEvents() {
    // изучить подобнее как осуществляется отложенная загрузка в RRD 7й версии и выше

    const response = await fetch("http://localhost:8080/events", {
        method: "GET",
    });

    if (!response.ok) {
        // return { isError: true, message: "Could not fetch events." };
        throw new Response(JSON.stringify({ message: "Could not fetch event" }), { status: 500 });
        // deprecated
        // throw json({message: "Could not fetch events."})
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() {
    return {
        events: loadEvents(),
    };
}
