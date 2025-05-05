import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { gameService } from "../../../services/gameService";
import { commentService } from "../../../services/commentService";

import Comments from "../../comments/comments/Comments";
import CreateComment from "../../comments/createComment/CreateComment";

export default function DetailsGame() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { gameId } = useParams();
    const { setError } = useError();

    const [pending, setPending] = useState(false);

    const [game, setGame] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState({ comment: "" });
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
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching game: ${error.message}`,
                    ]);
                }
            }
        };

        const fetchComments = async () => {
            try {
                const result = await commentService.getAll(gameId, signal);
                setComments(result);
            } catch (error) {
                if (!signal.aborted) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error fetching comments: ${error.message}`,
                    ]);
                }
            }
        };
        fetchGame();
        fetchComments();

        return () => {
            abortController.abort();
        };
    }, [gameId, setError]);

    const deleteGameHandler = async () => {
        const hasConfirm = confirm(
            `Are you sure you want to delete ${game.title} game?`
        );

        if (!hasConfirm) {
            return;
        }

        try {
            await gameService.delById(gameId);
            navigate("/games/catalog");
        } catch (error) {
            setError(`Delete game failed: ${error.message}`);
        }
    };

    const createCommentHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            const newComment = await commentService.createNew({
                gameId: gameId,
                content: comment,
            });
            setComments((prevComments) => [...prevComments, newComment]);
            setComment("");
        } catch (error) {
            setError(`Create comment failed: ${error.message}`);
        } finally {
            setPending(false);
        }
    };

    const validateComment = (value) => {
        if (value.length < 10) {
            return "Comment must be at least 10 characters long.";
        }
        return "";
    };

    const commentChangeHandler = (e) => {
        const value = e.target.value;
        setComment(value);
        setErrors({ comment: validateComment(value) });
    };

    const isFormValid = !errors.comment && comment;

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

                <Comments comments={comments} />

                {user && isOwner && (
                    <div className="buttons">
                        <Link to={`/games/edit/${gameId}`} className="button">
                            Edit
                        </Link>
                        <button
                            onClick={deleteGameHandler}
                            className="button del-button"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {user && !isOwner && (
                <CreateComment
                    onCreate={createCommentHandler}
                    onChange={commentChangeHandler}
                    comment={comment}
                    pending={pending}
                    isFormValid={isFormValid}
                    errors={errors}
                />
            )}
        </section>
    );
}
