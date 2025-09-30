export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places", { method: "GET" });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch place.");
    }

    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({ places: places }),
        headers: { "Content-Type": "application/json" },
    });
    const resData = response.json();

    if (!response.ok) {
        throw new Error("Failed to update user data.");
    }

    return resData.message;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places", { method: "GET" });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch user places.");
    }

    return resData.places;
}