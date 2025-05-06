export default function Comments({ comments, delComment, user }) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length > 0 ? (
                    comments.map((com) => (
                        <li key={com._id} className="comment">
                            <p>
                                {com._ownerId.email}: {com.content}
                            </p>

                            {user && user.role === "admin" ? (
                                <div className="buttons comments">
                                    <button
                                        onClick={() => delComment(com._id)}
                                        className="button del-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </li>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </ul>
        </div>
    );
}
