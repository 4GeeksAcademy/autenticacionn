import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Private from "./pages/Private.jsx";
import Layout from "./pages/Layout.jsx";

import useGlobalReducer from "./hooks/useGlobalReducer.jsx";

const PrivateRoute = ({ children }) => {
    const { store } = useGlobalReducer();
    return store.token ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            {
                path: "/private",
                element: <PrivateRoute><Private /></PrivateRoute>
            },
            {
                path: "*",
                element: <h1>404 - Página no encontrada</h1>
            }
        ]
    }
]);
