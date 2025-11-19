import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            {
                path: "events",
                element: <EventsRootLayout />,
                children: [
                    // проверить для чего служит свойство index в route
                    {
                        index: true,

                        element: <EventsPage />,
                        loader: eventsLoader,
                    },
                    { path: "new", element: <NewEventPage /> },
                    { path: ":eventId/edit", element: <EditEventPage /> },
                    { path: ":eventId", element: <EventDetailPage /> },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
