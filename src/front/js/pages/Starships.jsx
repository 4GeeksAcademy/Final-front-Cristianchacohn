import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Starships = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadStarships(); // Llama a la función de flux.js
    }, []);

    return (
        <div className="container">
            <h1>Starships</h1>
            <div className="row">
                {store.starships &&
                    store.starships.map((starship, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{starship.name}</h5>
                                    <Link to={`/starships/${starship.uid}`} className="btn btn-primary">
                                        Learn More
                                    </Link>
                                    <button
                                        className="btn btn-warning ml-2"
                                        onClick={() => actions.addFavorite(starship)}
                                    >
                                        Add to Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
