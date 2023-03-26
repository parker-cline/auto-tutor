/* homepage */
import { Link } from "react-router-dom";
import React from "react";

function Homepage() {
    return (
        <>
            <div className="container p-3">
                <h1>PathFinder</h1>
                <h4>Automated, adaptive, personalized math tutoring in algebra</h4>
                <Link to={'/setup'}>Setup Lesson</Link>
            </div>
        </>
    );
}

export default Homepage;