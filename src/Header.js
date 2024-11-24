import React from "react";
import { auth, signInWithGoogle, signOut } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Header.css";

function Header() {
    const [user] = useAuthState(auth);

    return (
        <div className="header">
            <div className="header-content">
                <h2>acai movie night</h2>
                <div
                    className="nav-link"
                    onClick={user ? signOut : signInWithGoogle}
                >
                    <p>{user ? "sign out" : "login"}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
