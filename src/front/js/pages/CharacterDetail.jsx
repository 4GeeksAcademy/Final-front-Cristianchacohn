import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                const data = await response.json();
                setCharacter(data.result);
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };

        fetchCharacter();
    }, [id]);

    return (
        <div className="container">
            {character ? (
                <div>
                    <div className="text-center">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                            onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
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
                <p>Loading character details...</p>
            )}
        </div>
    );
};
