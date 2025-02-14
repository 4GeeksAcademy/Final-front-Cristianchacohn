const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            starships: [],
            characterDetail: null,
            planetDetail: null,
            starshipDetail: null,
            favorites: JSON.parse(localStorage.getItem("favorites")) || [],
            isLogged: localStorage.getItem("token") ? true : false,
            user: null,
            alert: { text: "", background: "info", visible: false },
        },
        actions: {
            handleErrorImg: (event) => {
                event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                
            },
            signup: async (userData) => {
                const uri = `${process.env.BACKEND_URL}/api/signup`;
                try {
                    const response = await fetch(uri, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        getActions().setAlert(data.message || "Error en el registro", "danger");
                        return false;
                    }
                    getActions().setAlert("Usuario creado con éxito. Inicie sesión.", "success");
                    return true;
                } catch (error) {
                    console.error("Error en la solicitud de registro:", error);
                    getActions().setAlert("Error en el servidor.");
                    return false;
                }
            },        
            loadCharacters: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ characters: data.results.map(item => ({ uid: item.uid, name: item.name, type: "characters" })) });
                } catch (error) {
                    console.error("Error loading characters:", error);
                }
            },

            loadPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ planets: data.results.map(item => ({ uid: item.uid, name: item.name, type: "planets" })) });
                } catch (error) {
                    console.error("Error loading planets:", error);
                }
            },

            loadStarships: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/starships/");
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ starships: data.results.map(item => ({ uid: item.uid, name: item.name, type: "starships" })) });
                } catch (error) {
                    console.error("Error loading starships:", error);
                }
            },

            loadCharacterDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ characterDetail: data.result });
                } catch (error) {
                    console.error("Error loading character detail:", error);
                }
            },

            loadPlanetDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ planetDetail: data.result });
                } catch (error) {
                    console.error("Error loading planet detail:", error);
                }
            },

            loadStarshipDetail: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/starships/${id}`);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const data = await response.json();
                    setStore({ starshipDetail: data.result });
                } catch (error) {
                    console.error("Error loading starship detail:", error);
                }
            },

            addFavorite: (item) => {
                const store = getStore();
                if (!item.uid || !item.name || !item.type) return;
                if (store.favorites.some(fav => fav.uid === item.uid)) return;
                
                const updatedFavorites = [...store.favorites, item];
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },

            removeFavorite: (uid) => {
                const store = getStore();
                const filteredFavorites = store.favorites.filter(fav => fav.uid !== uid);
                setStore({ favorites: filteredFavorites });
                localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
            },

            setAlert: (message, type) => {
                setStore({ alert: { text: message, background: type, visible: true } });
                setTimeout(() => {
                    setStore({ alert: { text: "", background: "info", visible: false } });
                }, 3000);
            },

            

            login: async (dataToSend) => {
                const uri = `${process.env.BACKEND_URL}/api/login`;
                const options = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataToSend)
                };

                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) {
                        if (response.status === 401) getActions().setAlert("Email o contraseña incorrectos", "danger");
                        return false;
                    }
                    const data = await response.json();
                    localStorage.setItem('token', data.access_token);
                    setStore({ isLogged: true });

                    await getActions().getUser(); // Obtener datos del usuario después del login
                    getActions().setAlert("Inicio de sesión exitoso", "success");
                    return true;
                } catch (error) {
                    console.error("Error en login:", error);
                    return false;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                setStore({ isLogged: false, user: null, favorites: [] });
                getActions().setAlert("Sesión cerrada", "info");
            },

            getUser: async () => {
                const uri = `${process.env.BACKEND_URL}/api/user`;
                const options = {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };

                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) return;
                    const data = await response.json();
                    setStore({ user: data });
                } catch (error) {
                    console.error("Error en getUser:", error);
                }
            },

            accessProtected: async () => {
                const uri = `${process.env.BACKEND_URL}/api/protected`;
                const options = {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };

                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) return;
                    const data = await response.json();
                    getActions().setAlert(data.message, "success");
                } catch (error) {
                    console.error("Error en accessProtected:", error);
                }
            },
        },

        signup: async (userData) => {
    const uri = `${process.env.BACKEND_URL}/api/signup`;
    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            getActions().setAlert(data.message || "Error en el registro", "danger");
            return false;
        }
        getActions().setAlert("Usuario creado con éxito. Inicie sesión.", "success");
        return true;
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        getActions().setAlert("Error en el servidor.");
        return false;
            }
        }
        
    };

    
};

export default getState;
