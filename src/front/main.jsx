import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// ✅ Importa el componente AppRoutes correctamente
import AppRoutes from "./routes.jsx";

// Contexto global
import { StoreProvider } from "./hooks/useGlobalReducer";

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <AppRoutes />
            </StoreProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
