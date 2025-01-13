import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const StarshipsById = () => {
    const { id } = useParams();
    const [starship, setStarship] = useState(null);

    useEffect(() => {
        const fetchStarship = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                const data = await response.json();
                setStarship(data.result);
            } catch (error) {
                console.error("Error fetching starship details:", error);
            }
        };

        fetchStarship();
    }, [id]);

    return (
        <div className="container">
            {starship ? (
                <div>
                    <img
                        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                        onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
                        alt={starship.properties.name}
                        className="img-fluid rounded-start"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                    <h1>{starship.properties.name}</h1>
                    <p>Model: {starship.properties.model}</p>
                    <p>Manufacturer: {starship.properties.manufacturer}</p>
                    <p>Cost in Credits: {starship.properties.cost_in_credits}</p>
                    <p>Length: {starship.properties.length}</p>
                    <p>Passengers: {starship.properties.passengers}</p>
                </div>
            ) : (
                <p>Loading starship details...</p>
            )}
        </div>
    );
};
