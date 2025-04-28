import { Link } from "react-router";

export default function Header() {
    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                <Link to="/games/catalog">All games</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to="/games/create">Create Game</Link>
                    <a href="#">Logout</a>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link to="/auth/login">Login</Link>
                    <Link to="/auth/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}
