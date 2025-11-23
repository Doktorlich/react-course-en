import EventForm from "../components/EventForm";

export default function NewEventPage() {
    function submitHandler(event) {
        event.preventDefault();
    }
    return <EventForm onClick={() => submitHandler} method={"POST"} />;
}
