import { NavLink, useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
import { EVENTS } from "../events";

export default function EventDetailPage() {
    const { eventId } = useParams();

    const existingEvent = EVENTS.find(item => item.id === eventId);
    return (
        <main className={"content"}>
            <h1>Event detail page</h1>
            <p>Event ID: {eventId}</p>
            <EventItem event={existingEvent} />
            <NavLink to={".."} relative={"path"}>
                Back
            </NavLink>
        </main>
    );
}
