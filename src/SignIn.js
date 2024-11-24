import React from "react";
import "./SignIn.css";
import acai from "./acai.png";

const SignIn = () => {
    return (
        <div className="signin">
            <div className="signin-content">
                <img src={acai} alt="acai" className="photo-image" />
                <h2 className="signin-title">rsvp! &lt;3</h2>
                <p>sunday, nov 17, 7pm</p>
            </div>
        </div>
    );
};

export default SignIn;
