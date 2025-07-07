import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Private from "./pages/Private";
import Layout from "./pages/Layout";
import { useContext } from "react";
import { Context } from "./store/context"; // si usas contexto global

const PrivateRoute = ({ children }) => {
  const { store } = useContext(Context);
  return store.token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/private" element={<PrivateRoute><Private /></PrivateRoute>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
