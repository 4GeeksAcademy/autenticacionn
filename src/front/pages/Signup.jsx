import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				const err = await res.json();
				alert(err.error || "Error al registrarse");
				return;
			}

			alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
			navigate("/login");
		} catch (err) {
			console.error(err);
			alert("Error al conectar con el servidor.");
		}
	};

	return (
		<div className="container mt-5">
			<h2>Registro</h2>
			<form onSubmit={handleSignup}>
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
				<button type="submit" className="btn btn-primary">
					Registrarse
				</button>
			</form>
		</div>
	);
};

export default Signup;
