import { useState, useEffect, useRef } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { gameService } from "../../../services/gameService";

import GameForCatalog from "./gameForCatalog/GameForCatalog";
import Spinner from "../../shared/spinner/Spinner";

export default function Catalog() {
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
                const result = await gameService.getInfinity(page, signal);

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

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* {isLoading && (
                <div id="loader-wrapper" className="loader_wrapper">
                    <Spinner />
                </div>
            )} */}

            {!isLoading && games.length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )}

            {games.map((game) => (
                <GameForCatalog key={game._id} {...game} />
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
