import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importamos el Context API

export const Navbar = () => {
    const { store, actions } = useContext(Context); // Obtenemos store y actions del Context API

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Star Wars</Link>
                <div className="ml-auto d-flex align-items-center">
                    <Link to="/characters" className="btn btn-primary">Characters</Link>
                    <Link to="/planets" className="btn btn-primary ml-2">Planets</Link>
                    <Link to="/starships" className="btn btn-primary ml-2">Starships</Link>

                    {/* Dropdown de favoritos */}
                    <div className="dropdown ml-3">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Favorites ({store.favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            {store.favorites.length > 0 ? (
                                store.favorites.map((item, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <span>{item.name}</span>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => actions.removeFavorite(item.uid)} // Asegúrate de pasar `uid`
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
