import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./app/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/ui/NavBar";
import CrearFlujo from "./app/CrearFlujo";
import EditarFlujo from "./app/EditarFlujo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  // Escuchar cambios en el almacenamiento (por ejemplo, al cerrar sesión)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Actualiza estado al cambiar de ruta (por ejemplo, después de iniciar sesión)
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location]);

  return (
    <>
      {/* ✅ Mostrar NavBar solo si está logueado */}
      {isLoggedIn && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/crear" element={<CrearFlujo />} />
          <Route path="/editar/:id" element={<EditarFlujo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
