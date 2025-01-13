import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadCharacters(); // Llama a la función para cargar personajes
    }, []);

    return (
        <div className="container">
            <h1>Characters</h1>
            <div className="row">
                {store.characters &&
                    store.characters.map((character, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <Link to={`/characters/${character.uid}`} className="btn btn-primary">
                                        Learn More
                                    </Link>
                                    <button
                                        className={`btn ${store.favorites.some(fav => fav.uid === character.uid) ? "btn-danger" : "btn-warning"}`}
                                        onClick={() =>
                                            store.favorites.some(fav => fav.uid === character.uid)
                                                ? actions.removeFavorite(character.uid)
                                                : actions.addFavorite(character)
                                        }
                                    >
                                        {store.favorites.some(fav => fav.uid === character.uid) ? "Unfavorite" : "Add to Favorites"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
