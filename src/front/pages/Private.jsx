import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Private = () => {
	const { store } = useGlobalReducer();
	const [privateData, setPrivateData] = useState(null);

	useEffect(() => {
		const fetchPrivate = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
					headers: {
						Authorization: `Bearer ${store.token}`,
					},
				});
				const data = await res.json();
				if (res.ok) setPrivateData(data);
				else alert(data.error || "No autorizado");
			} catch (err) {
				console.error(err);
				alert("Error al cargar contenido privado");
			}
		};

		if (store.token) fetchPrivate();
	}, [store.token]);

	return (
		<div className="container mt-5">
			<h2>Zona Privada</h2>
			{privateData ? (
				<pre>{JSON.stringify(privateData, null, 2)}</pre>
			) : (
				<p>Cargando datos privados...</p>
			)}
		</div>
	);
};

export default Private;
