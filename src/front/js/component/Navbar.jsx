import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png"
                        alt="Logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    Star Wars
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/characters">
                                Characters
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/planets">
                                Planets
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/starships">
                                Starships
                            </Link>
                        </li>
                    </ul>

                    <div className="dropdown">
                        <button
                            className="btn btn-warning dropdown-toggle"
                            type="button"
                            id="favoritesDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                            {store.favorites.length > 0 ? (
                                store.favorites.map((item, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item d-flex justify-content-between align-items-center"
                                    >
                                        <span
                                            onClick={() => navigate(`/${item.type}/${item.uid}`)}
                                            style={{ cursor: "pointer", color: "#000", textDecoration: "none" }}
                                        >
                                            {item.name}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => actions.removeFavorite(item.uid)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item text-muted">No favorites added</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
