import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PlanetDetail = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
                const data = await response.json();
                setPlanet(data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanet();
    }, [id]);

    if (loading) return <p>Loading planet details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container d-flex justify-content-center">
            {planet ? (
                <div>
                    <img
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                        onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg")}
                        alt={planet.properties.name}
                        className="img-fluid rounded-start mt-5"
                        style={{
                            objectFit: "cover",
                            width: "250%",
                            height: "250px",
                        }}
                    />
                    <h1>{planet.properties.name}</h1>
                    <p>Diameter: {planet.properties.diameter}</p>
                    <p>Climate: {planet.properties.climate}</p>
                    <p>Population: {planet.properties.population}</p>
                    <p>Terrain: {planet.properties.terrain}</p>
                    <p>Gravity: {planet.properties.gravity}</p>
                </div>
            ) : (
                <p>No details available for this planet.</p>
            )}
        </div>
    );
};
