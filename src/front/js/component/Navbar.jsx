import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
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

                {/* Links */}
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

                    {/* Favorites Dropdown */}
                    <div className="dropdown">
                        <button
                            className="btn btn-warning dropdown-toggle"
                            type="button"
                            id="favoritesDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Favorites
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                            <li>
                                <Link className="dropdown-item" to="/favorites">
                                    View All Favorites
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => alert("Functionality Coming Soon!")}>
                                    Clear Favorites
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
