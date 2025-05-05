import { useState, useEffect } from "react";

import { useError } from "../../contexts/ErrorContext";

import { gameService } from "../../services/gameService";

import GameForHome from "../games/gameForHome/GameForHome";
import Spinner from "../shared/spinner/Spinner";

export default function Home() {
    const { setError } = useError();

    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchGames = async () => {
            try {
                const result = await gameService.getLastThree(signal);
                setGames(result);
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
    }, [setError]);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>
                {isLoading && (
                    <div id="loader-wrapper" className="loader_wrapper">
                        <Spinner />
                    </div>
                )}

                {!isLoading && games.length === 0 && (
                    <p className="no-articles">No games yet</p>
                )}

                {games.map((game) => (
                    <GameForHome key={game._id} {...game} />
                ))}
            </div>
        </section>
    );
}
