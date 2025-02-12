import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Activa el estado de carga

        try {
            const success = await actions.signup(formData);

            if (success) {
                alert("Usuario creado con éxito. Redirigiendo a la página principal...");
                navigate("/"); // Redirige a la página de inicio
            } else {
                alert("Hubo un error al crear el usuario. Inténtelo de nuevo.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error en el servidor");
        } finally {
            setLoading(false); // Desactiva el estado de carga
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            placeholder="Ingrese su nombre" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            placeholder="Ingrese su email" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            placeholder="Ingrese su contraseña" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
