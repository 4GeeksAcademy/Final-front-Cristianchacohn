import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PlanetDetail = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                const data = await response.json();
                setPlanet(data.result);
            } catch (error) {
                console.error("Error fetching planet details:", error);
            }
        };

        fetchPlanet();
    }, [id]);

    return (
        <div className="container">
            {planet ? (
                <div>
                    <h1>{planet.properties.name}</h1>
                    <p>Diameter: {planet.properties.diameter}</p>
                    <p>Climate: {planet.properties.climate}</p>
                    <p>Population: {planet.properties.population}</p>
                    <p>Terrain: {planet.properties.terrain}</p>
                    <p>Gravity: {planet.properties.gravity}</p>
                </div>
            ) : (
                <p>Loading planet details...</p>
            )}
        </div>
    );
};
