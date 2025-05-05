export default function CreateComment({
    onCreate,
    onChange,
    comment,
    pending,
    isFormValid,
    errors,
}) {
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form onSubmit={onCreate} className="form">
                <textarea
                    name="comment"
                    onChange={onChange}
                    required
                    value={comment}
                    placeholder="Comment......"
                ></textarea>
                {errors.comment && (
                    <p
                        style={{
                            color: "red",
                            fontWeight: "bold",
                            marginTop: 5,
                        }}
                    >
                        {errors.comment}
                    </p>
                )}
                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                    disabled={!isFormValid || pending}
                    style={
                        !isFormValid || pending
                            ? {
                                  cursor: "not-allowed",
                                  backgroundColor: "#778e9c",
                              }
                            : {}
                    }
                />
            </form>
        </article>
    );
}
