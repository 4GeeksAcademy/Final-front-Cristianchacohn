const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            starships: [],
            characterDetail: null,
            planetDetail: null,
            starshipDetail: null,
            favorites: JSON.parse(localStorage.getItem("favorites")) || [], // Cargar favoritos de localStorage
        },
        actions: {
            // Manejo de error de imágenes
            handleErrorImg: (event) => {
                event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
            },

            // Cargar personajes
            loadCharacters: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.results) {
                        const transformedCharacters = data.results.map((item) => ({
                            uid: item.uid,
                            name: item.name,
                            type: "characters",
                        }));
                        setStore({ characters: transformedCharacters });
                    }
                } catch (error) {
                    console.error("Error loading characters:", error);
                }
            },            

            // Cargar planetas
            loadPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.results) {
                        const transformedPlanets = data.results.map((item) => ({
                            uid: item.uid,
                            name: item.name,
                            type: "planets",
                        }));
                        setStore({ planets: transformedPlanets });
                    }
                } catch (error) {
                    console.error("Error loading planets:", error);
                }
            },

            // Cargar naves espaciales
            loadStarships: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/starships/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.results) {
                        const transformedStarships = data.results.map((item) => ({
                            uid: item.uid,
                            name: item.name,
                            type: "starships",
                        }));
                        setStore({ starships: transformedStarships });
                    }
                } catch (error) {
                    console.error("Error loading starships:", error);
                }
            },

            // Detalle de personaje
            loadCharacterDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.result) {
                        setStore({ characterDetail: data.result });
                    }
                } catch (error) {
                    console.error("Error loading character detail:", error);
                }
            },

            // Detalle de planeta
            loadPlanetDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.result) {
                        setStore({ planetDetail: data.result });
                    }
                } catch (error) {
                    console.error("Error loading planet detail:", error);
                }
            },

            // Detalle de nave espacial
            loadStarshipDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    if (data.result) {
                        setStore({ starshipDetail: data.result });
                    }
                } catch (error) {
                    console.error("Error loading starship detail:", error);
                }
            },

            // Agregar a favoritos
            addFavorite: (item) => {
                const store = getStore();
                if (!item.uid || !item.name || !item.type) {
                    console.error("El favorito no tiene las propiedades necesarias:", item);
                    return;
                }
                const alreadyExists = store.favorites.some((fav) => fav.uid === item.uid);
                if (alreadyExists) {
                    console.log(`El ítem "${item.name}" ya está en favoritos.`);
                    return;
                }
                const updatedFavorites = [...store.favorites, item];
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },            

            // Eliminar de favoritos
            removeFavorite: (uid) => {
                const store = getStore();
                const filteredFavorites = store.favorites.filter(fav => fav.uid !== uid);
                setStore({ favorites: filteredFavorites });
                localStorage.setItem("favorites", JSON.stringify(filteredFavorites)); // Actualizar en localStorage
            },
        },
    };
};

export default getState;
