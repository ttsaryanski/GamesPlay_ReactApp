import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { adminService } from "../../../services/adminService";

import Spinner from "../../shared/spinner/Spinner";

export default function AdminUsers() {
    const navigate = useNavigate();
    const { setError } = useError();
    const loaderRef = useRef(null);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const result = await adminService.getUsers(page, signal);

                if (result.users.length === 0) {
                    setHasMore(false);
                }

                setUsers((prev) => [...prev, ...result.users]);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            }
        };
        fetchUsers();

        return () => {
            abortController.abort();
        };
    }, [page, setError]);

    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasMore, isLoading]);

    const delUserHandler = async (userId) => {
        const hasConfirm = confirm(
            `Are you sure you want to delete this user?`
        );

        if (!hasConfirm) {
            return;
        }

        try {
            await adminService.delUserById(userId);
            setUsers((prev) => prev.filter((user) => user._id !== userId));
        } catch (error) {
            setError(`Delete user failed: ${error.message}`);
        }
    };

    const makeAdminHandler = async (userId) => {
        const hasConfirm = confirm(
            `Are you sure you want to make this user admin?`
        );

        if (!hasConfirm) {
            return;
        }

        try {
            await adminService.makeAdmin(userId);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: "admin" } : user
                )
            );
        } catch (error) {
            setError(`Make this user admin failed: ${error.message}`);
        }
    };

    return (
        <section id="catalog-page" className="admin_catalog">
            <h1>Users</h1>

            <button
                style={{ display: "block", margin: "0 auto" }}
                className="button del-button"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            {!isLoading && users.length === 0 && (
                <h3 className="no-articles">No users yet</h3>
            )}

            {users.map((user) => (
                <div key={user._id} className="allGames">
                    <div className="allGames-info admin_info">
                        <h2>
                            <span style={{ color: "red" }}>User:</span>{" "}
                            {user.email}
                        </h2>
                        <h6>
                            <span style={{ color: "red" }}>User role:</span>{" "}
                            {user.role}{" "}
                        </h6>

                        {user.role === "admin" ? (
                            ""
                        ) : (
                            <div
                                className="buttons"
                                style={{ height: "auto", paddingBottom: "0" }}
                            >
                                <button
                                    className="button del-button"
                                    onClick={() => makeAdminHandler(user._id)}
                                    disabled={user.role === "admin"}
                                    style={{
                                        opacity:
                                            user.role === "admin" ? 0.5 : 1,
                                        cursor:
                                            user.role === "admin"
                                                ? "not-allowed"
                                                : "pointer",
                                    }}
                                >
                                    Make admin
                                </button>
                                <button
                                    className="button del-button"
                                    onClick={() => delUserHandler(user._id)}
                                    disabled={user.role === "admin"}
                                    style={{
                                        opacity:
                                            user.role === "admin" ? 0.5 : 1,
                                        cursor:
                                            user.role === "admin"
                                                ? "not-allowed"
                                                : "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div
                ref={loaderRef}
                style={{ display: "flex", justifyContent: "center" }}
            >
                {isLoading && <Spinner />}
            </div>

            {!hasMore && !isLoading && (
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        color: "white",
                    }}
                >
                    All users are loaded.
                </p>
            )}
        </section>
    );
}
