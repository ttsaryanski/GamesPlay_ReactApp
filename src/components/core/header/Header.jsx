import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

export default function Header() {
    const { user, logout } = useAuth();
    const { setError } = useError();

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>

            {user ? (
                <span>Welcome: {user.email}</span>
            ) : (
                <span>Welcome: guest</span>
            )}

            <nav>
                <Link to="/games/catalog">All games</Link>
                {user ? (
                    <div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <a href="#">Logout</a>
                    </div>
                ) : (
                    <div id="guest">
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
