import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        alert(data.msg);

        if (data.msg === "Usuario creado correctamente") {
            navigate("/login");
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Crear cuenta</h2>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Signup;
