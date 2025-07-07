import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
			<Link className="navbar-brand" to="/">Inicio</Link>

			<div className="collapse navbar-collapse">
				<ul className="navbar-nav ms-auto">
					{store.token ? (
						<li className="nav-item">
							<button className="btn btn-danger" onClick={handleLogout}>
								Logout
							</button>
						</li>
					) : (
						<>
							<li className="nav-item me-2">
								<Link className="btn btn-outline-primary" to="/login">Login</Link>
							</li>
							<li className="nav-item">
								<Link className="btn btn-outline-success" to="/signup">Signup</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
