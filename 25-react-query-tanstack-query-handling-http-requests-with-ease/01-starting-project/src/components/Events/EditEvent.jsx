import { Link, redirect, useNavigate, useNavigation, useParams, useSubmit } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useNavigation();
    const submit = useSubmit();
    const { data, isError, error } = useQuery({
        queryKey: ["events", id],
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
        staleTime: 10000
    });

    // const {
    //     mutate,
    //     // isPending: isPendingUpdating,
    //     // isError: isErrorUpdating,
    //     // error: updateError,
    // } = useMutation({
    //     mutationFn: updateEvent,
    //     onMutate: async data => {
    //         const newEvent = data.event;
    //
    //         await queryClient.cancelQueries({ queryKey: ["events", id] });
    //         const previousEvent = queryClient.getQueryData(["events", id]);
    //
    //         queryClient.setQueryData(["events", id], newEvent);
    //         return { previousEvent: previousEvent };
    //     },
    //     onError: (error, data, context) => {
    //         queryClient.setQueryData(["events", id], context.previousEvent);
    //     },
    //
    //     onSettled: () => {
    //         queryClient.invalidateQueries(["events", id]);
    //     },
    // });

    function handleSubmit(formData) {
        // mutate({ id: id, event: formData });
        // navigate("../");
        submit(formData, { method: "PUT" });
    }

    function handleClose() {
        navigate("../");
    }

    let content;

    // if (isPending) {
    //     content = (
    //         <div className={"center"}>
    //             <LoadingIndicator />
    //         </div>
    //     );
    // }

    if (isError) {
        content = (
            <>
                <ErrorBlock
                    title={"Failed to load  event"}
                    message={
                        error?.info.message ||
                        "Failed to load event. Please check your inputs and try again later."
                    }
                />
                <div className={"form-actions"}>
                    <Link to={"../"} className={"button"}>
                        Okay
                    </Link>
                </div>
            </>
        );
    }

    if (data) {
        content = (
            <EventForm inputData={data} onSubmit={handleSubmit}>
                {state === "submitting" ? (
                    <p>Sending data...</p>
                ) : (
                    <>
                        <Link to="../" className="button-text">
                            Cancel
                        </Link>
                        <button type="submit" className="button">
                            Update
                        </button>
                    </>
                )}
            </EventForm>
        );
    }
    return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
    return queryClient.fetchQuery({
        queryKey: ["events", params.id],
        queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    });
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updatedEventData = Object.fromEntries(formData);
    await updateEvent({ id: params.id, event: updatedEventData });
    await queryClient.invalidateQueries(["events"]);
    return redirect("../");
}
