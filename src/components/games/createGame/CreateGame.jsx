import { useState } from "react";
import { useNavigate } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { gameService } from "../../../services/gameService";

export default function CreateGame() {
    const navigate = useNavigate();
    const { setError } = useError();

    const [pending, setPending] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [maxLevel, setMaxLevel] = useState(1);
    const [imageUrl, setImageUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await gameService.createNew({
                title,
                category,
                maxLevel,
                imageUrl,
                summary,
            });
            navigate("/games/catalog");
            clearForm();
        } catch (error) {
            setError(`Create game failed: ${error.message}`);
        } finally {
            setPending(false);
        }
    };

    const validateTitle = (value) => {
        if (value.length < 3) {
            return "Title must be at least 3 characters long.";
        }
        return "";
    };

    const validateCategory = (value) => {
        if (value.length < 3) {
            return "Category must be at least 3 characters long.";
        }
        return "";
    };

    const validateMaxLevel = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return "MaxLevel must be a number";
        }
        if (!Number.isInteger(numValue)) {
            return "MaxLevel must be an integer";
        }
        if (numValue < 1 || numValue > 100) {
            return "MaxLevel must be between 1 and 100";
        }
        return "";
    };

    const validateImageUrl = (value) => {
        const urlRegex = /^https?:\/\//;
        return urlRegex.test(value) ? "" : "Invalid URL format.";
    };

    const validateSummary = (value) => {
        if (value.length < 10) {
            return "Summary must be at least 10 characters long.";
        }
        return "";
    };

    const titleChangeHandler = (e) => {
        const value = e.target.value;
        setTitle(value);
        setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };

    const categoryChangeHandler = (e) => {
        const value = e.target.value;
        setCategory(value);
        setErrors((prev) => ({ ...prev, category: validateCategory(value) }));
    };

    const maxLevelChangeHandler = (e) => {
        const value = e.target.value;
        setMaxLevel(value);
        setErrors((prev) => ({
            ...prev,
            maxLevel: validateMaxLevel(value),
        }));
    };

    const imageUrlChangeHandler = (e) => {
        const value = e.target.value;
        setImageUrl(value);
        setErrors((prev) => ({
            ...prev,
            imageUrl: validateImageUrl(value),
        }));
    };

    const summaryChangeHandler = (e) => {
        const value = e.target.value;
        setSummary(value);
        setErrors((prev) => ({
            ...prev,
            summary: validateSummary(value),
        }));
    };

    const clearForm = () => {
        setTitle("");
        setCategory("");
        setMaxLevel(1);
        setImageUrl("");
        setSummary("");
    };

    const isFormValid =
        !errors.title &&
        !errors.category &&
        !errors.maxLevel &&
        !errors.imageUrl &&
        !errors.summary &&
        title &&
        category &&
        maxLevel &&
        imageUrl &&
        summary;

    return (
        <section id="create-page" className="auth">
            <form onSubmit={submitHandler} id="create">
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        value={title}
                        required
                        onChange={titleChangeHandler}
                    />
                    {errors.title && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.title}
                        </p>
                    )}

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        value={category}
                        required
                        onChange={categoryChangeHandler}
                    />
                    {errors.category && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.category}
                        </p>
                    )}

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        placeholder="1"
                        value={maxLevel}
                        required
                        onChange={maxLevelChangeHandler}
                    />
                    {errors.maxLevel && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.maxLevel}
                        </p>
                    )}

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={imageUrl}
                        required
                        onChange={imageUrlChangeHandler}
                    />
                    {errors.imageUrl && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.imageUrl}
                        </p>
                    )}

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={summary}
                        required
                        onChange={summaryChangeHandler}
                    ></textarea>
                    {errors.summary && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.summary}
                        </p>
                    )}
                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Game"
                        disabled={!isFormValid || pending}
                        style={
                            !isFormValid || pending
                                ? { cursor: "not-allowed" }
                                : {}
                        }
                    />
                </div>
            </form>
        </section>
    );
}
