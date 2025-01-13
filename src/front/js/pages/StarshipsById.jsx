import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

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