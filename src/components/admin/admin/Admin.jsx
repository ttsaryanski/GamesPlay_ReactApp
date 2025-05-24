import { Link } from "react-router";

export default function Admin() {
    return (
        <div id="home-page">
            <h1>Admin</h1>

            <div
                className="buttons admin"
                style={{ textAlign: "center", paddingRight: "0" }}
            >
                <Link to="/admin/users" className="button">
                    Users
                </Link>

                <Link to="/admin/games" className="button">
                    Games
                </Link>

                <Link to="/admin/stats" className="button">
                    Stats
                </Link>
            </div>
        </div>
    );
}
