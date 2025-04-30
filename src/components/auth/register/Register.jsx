import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";

export default function Register() {
    const { login } = useAuth();
    const { setError } = useError();

    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        rePassword: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);
        try {
            await authService.register({
                email,
                password,
            });

            await login(email, password);
            clearForm();
        } catch (error) {
            setError(`Registration failed: ${error.message}`);
            setPassword("");
            setRePassword("");
        } finally {
            setPending(false);
        }
    };

    const validateEmail = (value) => {
        const emailRegex =
            /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
    };

    const validatePassword = (value) => {
        if (value.length < 3) {
            return "Password must be at least 3 characters long.";
        }
        return "";
    };

    const validateRePassword = (value, password) => {
        if (value !== password) {
            return "Password missmatch!";
        }

        return "";
    };

    const emailChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const passwordChangeHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const rePasswordChangeHandler = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, password),
        }));
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
        setRePassword("");
    };

    const isFormValid =
        !errors.email &&
        !errors.password &&
        !errors.rePassword &&
        email &&
        password &&
        rePassword;

    return (
        <section id="register-page" className="content auth">
            <form onSubmit={submitHandler} id="register">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        required
                        onChange={emailChangeHandler}
                    />
                    {errors.email && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.email}
                        </p>
                    )}

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={password}
                        required
                        onChange={passwordChangeHandler}
                    />
                    {errors.password && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.password}
                        </p>
                    )}

                    <label htmlFor="rePassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="rePassword"
                        id="confirm-password"
                        value={rePassword}
                        required
                        onChange={rePasswordChangeHandler}
                    />
                    {errors.rePassword && (
                        <p
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            {errors.rePassword}
                        </p>
                    )}

                    <input
                        className="btn submit"
                        type="submit"
                        value="Register"
                        disabled={!isFormValid || pending}
                        style={
                            !isFormValid || pending
                                ? { cursor: "not-allowed" }
                                : {}
                        }
                    />

                    <p className="field">
                        <span>
                            If you already have profile click{" "}
                            <Link to="/auth/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
