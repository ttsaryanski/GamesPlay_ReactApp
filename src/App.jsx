import { Routes, Route } from "react-router";

import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";

import ErrorBoundary from "./components/boundary/ErrorBoundary";
import Header from "./components/core/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/games/catalog/Catalog";
import CreateGame from "./components/games/createGame/CreateGame";
import EditGame from "./components/games/editGame/EditGame";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Page404 from "./components/page 404/Page404";

import "./App.css";
import DetailsGame from "./components/games/detailsGame/DetailsGame";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <ErrorBoundary>
                    <div id="box">
                        <Header />

                        <ErrorMsg />

                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/games/catalog"
                                    element={<Catalog />}
                                />
                                <Route
                                    path="/games/create"
                                    element={<CreateGame />}
                                />
                                <Route
                                    path="/games/edit/:gameId"
                                    element={<EditGame />}
                                />
                                <Route
                                    path="/games/details/:gameId"
                                    element={<DetailsGame />}
                                />

                                <Route path="/auth/login" element={<Login />} />
                                <Route
                                    path="/auth/register"
                                    element={<Register />}
                                />

                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </main>
                    </div>
                </ErrorBoundary>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
