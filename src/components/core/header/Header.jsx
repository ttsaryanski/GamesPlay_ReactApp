import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header>
            <Link className="home" to="/">
                GamesPlay
            </Link>

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
                        {user && user.role === "admin" ? (
                            <Link to="/admin">Admin</Link>
                        ) : (
                            ""
                        )}
                        <button onClick={logout} className="a button">
                            Logout
                        </button>
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
