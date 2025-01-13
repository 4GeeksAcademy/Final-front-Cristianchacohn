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
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <Link to={`/planets/${planet.uid}`} className="btn btn-primary">
                                        Learn More
                                    </Link>
                                    <button
                                        className="btn btn-warning ml-2"
                                        onClick={() => actions.addFavorite(planet)}
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
