export default function Boundary() {
    return (
        <section id="login-page" className="auth">
            <form id="login">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Whoops, there's a bug in the code &#40;:</h1>
                    <p style={{ color: "white", fontWeight: "bold" }}>
                        The author will do everything possible to fix the
                        problem. Press button "Go back home" and reload page!
                    </p>
                    <div className="buttons boundary">
                        <a href="/" className="button del-button">
                            Go back home
                        </a>
                    </div>
                </div>
            </form>
        </section>
    );
}
