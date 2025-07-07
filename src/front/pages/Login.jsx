import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();

			if (res.ok && data.access_token) {
				dispatch({
					type: "LOGIN",
					payload: { token: data.access_token, user: data.user }
				});
				navigate("/private");
			} else {
				alert("Login incorrecto");
			}
		} catch (err) {
			console.error("Login error:", err);
			alert("Error al intentar iniciar sesión");
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Iniciar sesión</h2>
			<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
			<button type="submit">Entrar</button>
		</form>
	);
};

export default Login;
