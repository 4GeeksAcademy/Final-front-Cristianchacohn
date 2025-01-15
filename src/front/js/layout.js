import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

import { Home } from "./pages/Home.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Starships } from "./pages/Starships.jsx";
import { StarshipsById } from "./pages/StarshipsById.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharacterDetail } from "./pages/CharacterDetail.jsx";
import { PlanetDetail } from "./pages/PlanetDetail.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Planets />} path="/planets" />
                    <Route element={<PlanetDetail />} path="/planet/:id" />>                    
                    <Route element={<Starships />} path="/starships" />
                    <Route element={<StarshipsById />} path="/starship/:id" />
                    <Route element={<Characters />} path="/characters" />
                    <Route element={<CharacterDetail />} path="/character/:id" />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
