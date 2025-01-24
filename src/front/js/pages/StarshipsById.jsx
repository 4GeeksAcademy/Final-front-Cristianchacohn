import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const StarshipsById = () => {
    const { id } = useParams();
    const [starship, setStarship] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStarship = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
                const data = await response.json();
                setStarship(data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStarship();
    }, [id]);

    if (loading) return <p>Loading starship details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container d-flex justify-content-center mt-3">
            {starship ? (
                <div>
                    <img
                        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                        onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg")}
                        alt={starship.properties.name}
                        className="img-fluid rounded-start"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "300px",
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
                <p>No details available for this starship.</p>
            )}
        </div>
    );
};
