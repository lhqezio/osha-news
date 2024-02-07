function CommentPage() {
    return (
        <div>
            <h2>
                New Comment:
            </h2>
            <form>
                <div>
                <label for="usern">
                    Username
                </label>
                <input type="text" id="usern" name="usern">
                </input>
                </div>
                <div>
                <label for="comment">
                    Comment
                </label>
                <input type="text" id="comment" name="comment">
                </input>
                </div>
            </form>
        </div>
    )
}

export default CommentPage