import { useState, useEffect } from "react";

import { gameService } from "../../../services/gameService";

import GameForCatalog from "../gameForCatalog/GameForCatalog";
import Spinner from "../../shared/spinner/Spinner";

export default function Catalog() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        //setError(null);
        const fetchGames = async () => {
            try {
                const result = await gameService.getAll(signal);
                setGames(result);
                setIsLoading(false);
            } catch (error) {
                // if (!signal.aborted) {
                //     setError(error.message);
                // }
                console.log(error.message);
            }
        };
        fetchGames();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {isLoading && (
                <div id="loader-wrapper" className="loader_wrapper">
                    <Spinner />
                </div>
            )}

            {!isLoading && games.length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )}

            {games.map((game) => (
                <GameForCatalog key={game._id} {...game} />
            ))}
        </section>
    );
}
