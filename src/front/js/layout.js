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

import { Login } from "./pages/LogIn.jsx";
import { Signup } from "./pages/SignUp.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Planets />} path="/planets" />
                    <Route element={<PlanetDetail />} path="/planets/:id" />
                    <Route element={<Starships />} path="/starships" />
                    <Route element={<StarshipsById />} path="/starships/:id" />
                    <Route element={<Characters />} path="/characters" />
                    <Route element={<CharacterDetail />} path="/characters/:id" />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
