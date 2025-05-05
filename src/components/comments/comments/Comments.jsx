import { useEffect, useRef } from "react";

export default function Comments({ comments }) {
    const lastCommentRef = useRef(null);

    useEffect(() => {
        if (lastCommentRef.current) {
            lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments]);

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length > 0 ? (
                    comments.map((com, index) => (
                        <li
                            key={com._id}
                            ref={
                                index === comments.length - 1
                                    ? lastCommentRef
                                    : null
                            }
                            className="comment"
                        >
                            <p>
                                {com._ownerId.email}: {com.content}
                            </p>
                        </li>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </ul>
        </div>
    );
}
