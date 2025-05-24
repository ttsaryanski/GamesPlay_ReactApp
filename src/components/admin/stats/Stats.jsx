import { useState, useEffect, useRef } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { adminService } from "../../../services/adminService";

import Spinner from "../../shared/spinner/Spinner";

export default function Stats() {
    const { setError } = useError();
    const loaderRef = useRef(null);

    const [stats, setStats] = useState([]);
    const [totalStatsCount, setTotalStatsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [userIp, setUserIp] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const [result, ipResult] = await Promise.all([
                    adminService.getStats(page, signal),
                    fetch("https://api.ipify.org?format=json"),
                ]);

                const ipData = await ipResult.json();
                setUserIp(ipData);

                if (result.stats.length === 0) {
                    setHasMore(false);
                }
                setStats((prev) => [...prev, ...result.stats]);
                setTotalStatsCount(result.totalCount - 1);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError(error.message);
                }
            }
        };
        fetchStats();

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
        <section id="catalog-page" className="admin_catalog">
            <h1>Total visits: {totalStatsCount}</h1>

            {isLoading && (
                <div id="loader-wrapper" className="loader_wrapper">
                    <Spinner />
                </div>
            )}

            {!isLoading && stats.length === 0 && (
                <h3 className="no-articles">No stats yet</h3>
            )}

            {stats.map((stat) => {
                const isCurrentUser = stat.ip === userIp.ip;

                return (
                    <div key={stat._id} className="allGames">
                        <div className="allGames-info admin_info">
                            <h2 style={{ paddingBottom: "30px" }}>
                                <span style={{ color: "red" }}>IP:</span>{" "}
                                {stat.ip}
                                {isCurrentUser && (
                                    <span
                                        style={{
                                            marginLeft: "10px",
                                            color: "red",
                                        }}
                                    >
                                        ← You
                                    </span>
                                )}
                            </h2>

                            <h6>
                                <span style={{ color: "red" }}>Date:</span>{" "}
                                {new Date(stat.timestamp).toLocaleString(
                                    "bg-BG"
                                )}
                                ;
                            </h6>
                        </div>
                    </div>
                );
            })}
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
                    All stat are loaded.
                </p>
            )}
        </section>
    );
}
