import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function Rutas() {
  const { autenticado } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={autenticado ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={autenticado ? <DashboardPage /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to={autenticado ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter><Rutas /></BrowserRouter>
    </AuthProvider>
  );
}