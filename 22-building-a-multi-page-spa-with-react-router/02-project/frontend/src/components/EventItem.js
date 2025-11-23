import classes from "./EventItem.module.css";
import { NavLink, useSubmit } from "react-router-dom";

function EventItem({ event }) {
    const submit = useSubmit()
    function startDeleteHandler() {
        const proceed = window.confirm("Are you sure?");
        if (proceed) {
            submit(null, {method:"DELETE"})
        }
    }

    return (
        <article className={classes.event}>
            <img src={event.image} alt={event.title} />
            <h1>{event.title}</h1>
            <time>{event.date}</time>
            <p>{event.description}</p>
            <menu className={classes.actions}>
                <NavLink to={`edit`}>Edit</NavLink>
                <button onClick={startDeleteHandler}>Delete</button>
            </menu>
        </article>
    );
}

export default EventItem;
