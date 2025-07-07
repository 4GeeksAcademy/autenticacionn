import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Private = () => {
    const [msg, setMsg] = useState("Cargando...");
    const { store } = useGlobalReducer();

    useEffect(() => {
        const fetchPrivateData = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
                headers: {
                    Authorization: `Bearer ${store.token}`
                }
            });

            const data = await res.json();
            setMsg(data.msg || "No autorizado");
        };

        if (store.token) {
            fetchPrivateData();
        } else {
            setMsg("No tienes token. Debes iniciar sesión.");
        }
    }, [store.token]);

    return (
        <div>
            <h2>Zona Privada</h2>
            <p>{msg}</p>
        </div>
    );
};

export default Private;
