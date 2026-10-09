import { useState, useCallback } from "react";
import { AuthContext } from "./useAuth";
import { iniciarSesion } from "../services/authService";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const login = useCallback(async (username, password) => {
    const resultado = await iniciarSesion(username, password);
    setToken(resultado.token);
    setUsuario(resultado.usuario);
    return resultado;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, usuario, autenticado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}