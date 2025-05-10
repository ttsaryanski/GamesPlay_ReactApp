import { useState, useEffect, useRef } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { adminService } from "../../../services/adminService";

import Spinner from "../../shared/spinner/Spinner";

export default function AdminGames() {
    const { setError } = useError();
    const loaderRef = useRef(null);

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchGames = async () => {
            setIsLoading(true);
            try {
                const result = await adminService.getGames(page, signal);

                if (result.games.length === 0) {
                    setHasMore(false);
                }

                setGames((prev) => [...prev, ...result.games]);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            }
        };
        fetchGames();

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

    const delGameHandler = async (gameId) => {
        const hasConfirm = confirm(
            `Are you sure you want to delete this game?`
        );

        if (!hasConfirm) {
            return;
        }

        try {
            await adminService.delGameById(gameId);
            setGames((prev) => prev.filter((game) => game._id !== gameId));
        } catch (error) {
            setError(`Delete game failed: ${error.message}`);
        }
    };

    return (
        <section id="catalog-page" className="admin_catalog">
            <h1>Games</h1>

            {!isLoading && games.length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )}

            {games.map((game) => (
                <div key={game._id} className="allGames">
                    <div className="allGames-info admin_info">
                        <h2>
                            <span style={{ color: "red" }}>Game title:</span>{" "}
                            {game.title}
                        </h2>
                        <h6>
                            <span style={{ color: "red" }}>Game author:</span>{" "}
                            {game._ownerId.email}{" "}
                        </h6>
                        <h6>
                            <span style={{ color: "red" }}>Author role:</span>{" "}
                            {game._ownerId.role}
                        </h6>
                        <div
                            className="buttons"
                            style={{ height: "auto", paddingBottom: "0" }}
                        >
                            <button
                                className="button del-button"
                                onClick={() => delGameHandler(game._id)}
                            >
                                Delete
                            </button>
                        </div>
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
                    All games are loaded.
                </p>
            )}
        </section>
    );
}
