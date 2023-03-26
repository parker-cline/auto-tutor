/* homepage */
import { Link } from "react-router-dom";
import React from "react";

function Homepage() {
    return (
        <>
            <div className="container p-3">
                <h1>AutoTutor</h1>
                <h2>Automated, adaptive, personalized math tutoring in algebra</h2>
                <Link to={'/setup'}>Setup Lesson</Link>
            </div>
        </>
    );
}

export default Homepage;