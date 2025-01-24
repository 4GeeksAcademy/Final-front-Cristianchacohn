import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
                const data = await response.json();
                setCharacter(data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <p>Loading character details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container d-flex justify-content-center">
            {character ? (
                <div>
                    <div className="text-center mt-3">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                            onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg")}
                            alt={character.properties.name}
                            className="img-fluid rounded"
                            style={{
                                objectFit: "cover",
                                width: "300px",
                                height: "300px",
                                marginBottom: "20px",
                            }}
                        />
                    </div>
                    <h1>{character.properties.name}</h1>
                    <p>Height: {character.properties.height}</p>
                    <p>Mass: {character.properties.mass}</p>
                    <p>Hair Color: {character.properties.hair_color}</p>
                    <p>Skin Color: {character.properties.skin_color}</p>
                    <p>Eye Color: {character.properties.eye_color}</p>
                </div>
            ) : (
                <p>No details available for this character.</p>
            )}
        </div>
    );
};
