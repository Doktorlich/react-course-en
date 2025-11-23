import {
    Await,
    defer,
    NavLink,
    redirect,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
    // const { eventId } = useParams();
    //
    // const existingEvent = EVENTS.find(item => item.id === eventId);

    const { event, events } = useRouteLoaderData("event-detail");

    return (
        <main className={"content"}>
            <h1>Event detail page</h1>
            <p>Event ID:</p>

            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={event}>{loadedEvent => <EventItem event={loadedEvent} />}</Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>

            <NavLink to={".."} relative={"path"}>
                Back
            </NavLink>
        </main>
    );
}

async function loadEvent(eventId) {
    const response = await fetch(`http://localhost:8080/events/${eventId}`, { method: "GET" });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: "Could not fetch details for selected event." }),
            { status: 500 },
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

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

export async function loader({ request, params }) {
    const eventId = params.eventId;
    return defer({
        event: await loadEvent(eventId),
        events: loadEvents(),
    });
}

export async function action({ request, params }) {
    const eventId = params.eventId;

    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Filed to delete this event" }));
    } else {
        return redirect("/events");
    }
}
