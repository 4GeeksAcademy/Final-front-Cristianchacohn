import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPlanets(); // Llama a la función de flux.js
    }, []);

    return (
        <div className="container">
            <h1>Planets</h1>
            <div className="row">
                {store.planets &&
                    store.planets.map((planet, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                    onError={(event) => {
                                        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                                    }}
                                    alt={planet.name}
                                    className="card-img-top"
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <Link to={`/planets/${planet.uid}`} className="btn btn-primary">
                                        Learn More
                                    </Link>
                                    <button
                                        className={`btn ${
                                            store.favorites.some(fav => fav.uid === planet.uid) ? "btn-danger" : "btn-warning"
                                        }`}
                                        onClick={() =>
                                            store.favorites.some(fav => fav.uid === planet.uid)
                                                ? actions.removeFavorite(planet.uid)
                                                : actions.addFavorite(planet)
                                        }
                                    >
                                        {store.favorites.some(fav => fav.uid === planet.uid) ? "Unfavorite" : "Add to Favorites"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
