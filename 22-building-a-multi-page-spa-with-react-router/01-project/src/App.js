import {
    createBrowserRouter,
    // createRoutesFromElements,
    // Route,
    RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// const routeDefinitions = createRoutesFromElements(
//     <Route>
//         <Route path={"/"} element={<HomePage/>}/>
//         <Route path={"/products"} element={<ProductsPage/>}/>
//         <Route path={"*"} element={<h1>Page not found</h1>}/>
//     </Route>,
// )

// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <ProductsPage /> },
            { path: "products/:productId", element: <ProductDetailPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
