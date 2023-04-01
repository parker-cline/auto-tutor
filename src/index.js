import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/navBar.js";
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

// this is the error page that will be displayed if the user goes to a page that doesn't exist
function ErrorBoundary() {
    return (
        <>
            <h1>404</h1>
            <Link to={'/setup'}>Go back to the setup page.</Link>
        </>
    )
}

// this controls routing: so if a user goes to parkercapstone.vercel.app/lesson, 
// they will see the lesson page, for example
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