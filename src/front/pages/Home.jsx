import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const [error, setError] = useState(null);

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined");

			const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/hello`);
			const data = await response.json();

			if (response.ok) {
				dispatch({ type: "set_hello", payload: data.message });
			} else {
				throw new Error(data.message || "Unexpected error");
			}
		} catch (err) {
			console.error("Error loading message:", err.message);
			setError("⚠️ Could not fetch the message from the backend. Please check if the backend is running.");
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>

			<div className="alert alert-info">
				{error ? (
					<span className="text-danger">{error}</span>
				) : store.message ? (
					<span>{store.message}</span>
				) : (
					<span>Loading message from the backend...</span>
				)}
			</div>
		</div>
	);
};

export default Home;
