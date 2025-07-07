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
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.error || "Credenciales inválidas");
				return;
			}

			dispatch({
				type: "LOGIN",
				payload: {
					token: data.access_token,
					user: data.user,
				},
			});

			alert("Login exitoso");
			navigate("/private");
		} catch (err) {
			console.error(err);
			alert("Error al conectar con el servidor.");
		}
	};

	return (
		<div className="container mt-5">
			<h2>Iniciar Sesión</h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					className="form-control mb-2"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					className="form-control mb-2"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit" className="btn btn-success">
					Entrar
				</button>
			</form>
		</div>
	);
};

export default Login;
