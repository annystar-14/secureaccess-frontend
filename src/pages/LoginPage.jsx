import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, LockKeyhole, UserRound, Eye,
  EyeOff, ArrowRight, LoaderCircle, AlertCircle
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await login(username.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div className="login-brand-icon"><ShieldCheck size={23} /></div>
          <div>
            <strong>SecureAccess</strong>
            <span>ZERO TRUST SECURITY</span>
          </div>
        </div>

        <section className="login-card">
          <div className="login-card-header">
            <div className="login-icon"><LockKeyhole size={25} /></div>
            <span className="login-tag">✦ Acceso seguro</span>
          </div>

          <div className="login-heading">
            <h1>Ciberseguridad <span>☁︎</span></h1>
            <p>Ingresa tus credenciales para acceder a tu espacio de trabajo protegido.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username">Nombre de usuario</label>
              <div className="login-input">
                <UserRound size={18} />
                <input id="username" type="text" placeholder="Tu nombre de usuario"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username" required />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <div className="login-input">
                <LockKeyhole size={18} />
                <input id="password" type={mostrarPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" required />

                <button type="button" className="login-eye"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                  {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <AlertCircle size={17} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="login-submit" disabled={cargando}>
              {cargando ? (
                <><LoaderCircle size={18} className="spin" /> Verificando...</>
              ) : (
                <>Iniciar sesión <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={16} />
            <span>Acceso exclusivo para usuarios autorizados</span>
          </div>
        </section>

        <footer className="login-footer">
          <span>© 2026 SecureAccess</span>
          <span>Protección de identidad · Zero Trust</span>
        </footer>
      </div>
    </main>
  );
}