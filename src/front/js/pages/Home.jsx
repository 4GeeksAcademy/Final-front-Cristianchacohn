import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container text-center mt-5">
      <h1 className="text-warning">¡Bienvenido, {store.user?.email}!</h1>
      <div className="">
        <h3>Detalles del Usuario</h3>
        <p><strong>Email:</strong> {store.user?.email}</p>
        <p><strong>ID:</strong> {store.user?.id}</p>
        <p><strong>Estado:</strong> {store.user?.is_active ? "Activo" : "Inactivo"}</p>
      </div>
    </div>
  );
};
