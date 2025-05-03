export default function Comments({ comments }) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length > 0 ? (
                    comments.map(({ _id, author, content }) => (
                        <li key={_id} className="comment">
                            <p>
                                {author}: {content}
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
