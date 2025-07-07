import { Link } from "react-router-dom";
import { useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav>
            <Link to="/">Inicio</Link>
            {store.token ? (
                <button onClick={actions.logout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
