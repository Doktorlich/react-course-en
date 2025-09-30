import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
    //состояние в котором храним данные полученные от сервера
    const [availablePlaces, setAvailablePlaces] = useState([]);
    //состояние которое позволяет сказать пользователю, что нужно подождать прежде чем данные будут получены от сервера
    const [isFetching, setIsFetching] = useState(false);
    //состояние в котором храним полученные статус ошибки
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlaces() {
            setError(null);
            try {
                const fetchPlaces = await fetchAvailablePlaces();
                navigator.geolocation.getCurrentPosition(position => {
                    const sortedPlaces = sortPlacesByDistance(
                        fetchPlaces,
                        position.coords.latitude,
                        position.coords.longitude,
                    );
                    setAvailablePlaces(sortedPlaces);
                    setIsFetching(false);
                });
            } catch (error) {
                setError({
                    message: error.message || "Could not fetch places, please try again later.",
                });
                setIsFetching(false);
            }
        }
        fetchPlaces();
    }, []);

    if (error) {
        return <Error title={"An error occurred!"} message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText={"Fetching place data..."}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
