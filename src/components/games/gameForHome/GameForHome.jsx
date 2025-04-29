import { Link } from "react-router";

export default function GameForHome({ _id, imageUrl, title }) {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src={imageUrl} />
            </div>
            <h3>{title}</h3>
            <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/games/details/${_id}`} className="btn details-btn">
                    Details
                </Link>
            </div>
        </div>
    );
}
