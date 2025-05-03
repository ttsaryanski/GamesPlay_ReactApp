import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { gameService } from "../../../services/gameService";

import Comments from "../../comments/comments/Comments";
import CreateComment from "../../comments/createComment/CreateComment";

export default function DetailsGame() {
    const { user, isAuthenticated } = useAuth();
    const { gameId } = useParams();
    const { setError } = useError();

    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const isOwner = user?._id === game._ownerId;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchGame = async () => {
            try {
                const result = await gameService.getById(gameId, signal);
                setGame(result);
            } catch (error) {
                if (!signal.aborted) {
                    setError(`Error fetching game: ${error.message}`);
                }
            }
        };
        fetchGame();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <Comments comments={comments} />

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {user && isOwner && (
                    <div className="buttons">
                        <a href="#" className="button">
                            Edit
                        </a>
                        <a href="#" className="button">
                            Delete
                        </a>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {user && !isOwner && <CreateComment />}
        </section>
    );
}
