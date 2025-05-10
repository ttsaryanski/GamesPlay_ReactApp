import { Routes, Route } from "react-router";

import { ErrorProvider } from "./contexts/ErrorContext";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/boundary/ErrorBoundary";

import AdminGuard from "./components/guards/AdminGuard";
import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";

import Header from "./components/core/header/Header";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";
import Admin from "./components/admin/admin/Admin";
import AdminGames from "./components/admin/adminGames/AdminGames";
import AdminUsers from "./components/admin/adminUsers/AdminUsers";
import Home from "./components/home/Home";
import Catalog from "./components/games/catalog/Catalog";
import DetailsGame from "./components/games/detailsGame/DetailsGame";
import CreateGame from "./components/games/createGame/CreateGame";
import EditGame from "./components/games/editGame/EditGame";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Page404 from "./components/page 404/Page404";

import "./App.css";

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
                                    path="/games/details/:gameId"
                                    element={<DetailsGame />}
                                />

                                <Route element={<AuthGuard />}>
                                    <Route
                                        path="/games/create"
                                        element={<CreateGame />}
                                    />

                                    <Route
                                        path="/games/edit/:gameId"
                                        element={<EditGame />}
                                    />
                                </Route>

                                <Route element={<GuestGuard />}>
                                    <Route
                                        path="/auth/login"
                                        element={<Login />}
                                    />

                                    <Route
                                        path="/auth/register"
                                        element={<Register />}
                                    />
                                </Route>

                                <Route element={<AdminGuard />}>
                                    <Route path="/admin" element={<Admin />} />

                                    <Route
                                        path="/admin/games"
                                        element={<AdminGames />}
                                    />

                                    <Route
                                        path="/admin/users"
                                        element={<AdminUsers />}
                                    />
                                </Route>

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
