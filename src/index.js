import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./navBar.js";
import Customize from "./customize.js";
import Lesson from "./lesson.js";
import Homepage from "./homepage.js";


import {
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/work-sans";
import "./index.css";

/* Routing */

function ErrorBoundary() {
    return (
        <>
            <h1>Looks like you've encountered an error.</h1>
            <p>If you see this message, you should contact Parker. Might be an issue. For now...</p>
            <Link to={'/setup'}>Go back to the setup page.</Link>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/lesson",
        element: <Lesson />,
    },
    {
        path: "/setup",
        element: <Customize />,
    },
    {
        path: '/',
        element: <Homepage />,
        errorElement: <ErrorBoundary />
    }
]);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(

    <React.StrictMode>
        <NavBar />
        <RouterProvider router={router} />
    </React.StrictMode>
);