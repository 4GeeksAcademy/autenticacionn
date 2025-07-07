import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// React Router
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";

// Contexto global
import { StoreProvider } from "./hooks/useGlobalReducer"; // Proveedor del contexto global (useContext)

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    );
};

// Asegúrate que en tu `index.html` exista: <div id="app"></div>
ReactDOM.createRoot(document.getElementById("app")).render(<Main />);
