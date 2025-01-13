const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            starships: [],
            favorites: [],
        },
        actions: {
            // Cargar personajes
            handleErrorImg: (event) => {
                event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
            },

            loadCharacters: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people/");
                    const data = await response.json();
                    if (data.results) {
                        setStore({ characters: data.results });
                    }
                } catch (error) {
                    console.error("Error loading characters:", error);
                }
            },

            getCharacterById: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                    const data = await response.json();
                    return data.result;
                } catch (error) {
                    console.error("Error fetching character details:", error);
                }
            },

            // Cargar planetas
            loadPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets/");
                    const data = await response.json();
                    if (data.results) {
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.error("Error loading planets:", error);
                }
            },

            // Cargar naves espaciales
            loadStarships: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/starships/");
                    const data = await response.json();
                    if (data.results) {
                        setStore({ starships: data.results });
                    }
                } catch (error) {
                    console.error("Error loading starships:", error);
                }
            },

            getStarshipById: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                    const data = await response.json();
                    return data.result;
                } catch (error) {
                    console.error("Error fetching starship details:", error);
                }
            },

            // Agregar a favoritos
            addFavorite: (item) => {
                const store = getStore();
                // Usamos `uid` para verificar si ya existe en favoritos
                const alreadyExists = store.favorites.some(fav => fav.uid === item.uid);
                if (!alreadyExists) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            // Eliminar de favoritos
            removeFavorite: (uid) => {
                const store = getStore();
                const filteredFavorites = store.favorites.filter(fav => fav.uid !== uid);
                setStore({ favorites: filteredFavorites });
            },
        },
    };
};

export default getState;
