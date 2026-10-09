import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, LogOut, UserRound, KeyRound,
  Server, LockKeyhole, CheckCircle2, Activity
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { obtenerDashboard } from "../services/authService";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const { usuario, token, logout } = useAuth();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("Verificando acceso...");

  useEffect(() => {
    let activo = true;

    async function verificar() {
      try {
        await obtenerDashboard(token);
        if (activo) setEstado("Acceso autorizado");
      } catch {
        if (activo) {
          logout();
          navigate("/login", { replace: true });
        }
      }
    }

    verificar();
    return () => { activo = false; };
  }, [token, logout, navigate]);

  function cerrarSesion() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon"><ShieldCheck size={23} /></div>
          <div><strong>SecureAccess</strong><span>ZERO TRUST SECURITY</span></div>
        </div>

        <button className="dashboard-logout" onClick={cerrarSesion}>
          <LogOut size={17} /> Cerrar sesión
        </button>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <span className="dashboard-tag"><Activity size={15} /> PANEL DE CONTROL</span>
          <h1>Hola, {usuario?.username} <span>☁︎</span></h1>
          <p>Bienvenida a tu espacio de trabajo seguro. Aquí puedes consultar el estado de tu sesión.</p>
        </div>

        <section className="dashboard-banner">
          <div>
            <span className="dashboard-banner-tag"><ShieldCheck size={16} /> SEGURIDAD DE ACCESO</span>
            <h2>Espacio de practica, sesion en aws.</h2>
            <p>Has iniciado sesión mediante un sistema de autenticación con JWT y contraseñas protegidas.</p>
            <div className="dashboard-status"><CheckCircle2 size={17} /> {estado}</div>
          </div>
          <div className="dashboard-banner-icon"><ShieldCheck size={80} strokeWidth={1.2} /></div>
        </section>

        <h3 className="dashboard-section-title">Resumen de seguridad</h3>

        <section className="dashboard-cards">
          <article className="dashboard-card">
            <div className="dashboard-card-icon violet"><UserRound size={22} /></div>
            <span>Usuario autenticado</span>
            <strong>{usuario?.username}</strong>
            <small>Identidad verificada</small>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon pink"><KeyRound size={22} /></div>
            <span>Método de acceso</span>
            <strong>JWT</strong>
            <small>Token firmado por el servidor</small>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon green"><ShieldCheck size={22} /></div>
            <span>Estado de sesión</span>
            <strong>{estado}</strong>
            <small>Validación del backend</small>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon blue"><Server size={22} /></div>
            <span>API protegida</span>
            <strong>Express</strong>
            <small>Comunicación con el backend</small>
          </article>
        </section>

        <section className="dashboard-info">
          <div className="dashboard-info-heading">
            <LockKeyhole size={20} />
            <h3>Controles de autenticación</h3>
          </div>

          <div className="dashboard-info-item">
            <CheckCircle2 size={18} />
            <div><strong>Contraseñas cifradas mediante hash</strong><span>Almacenamiento con Argon2id</span></div>
          </div>

          <div className="dashboard-info-item">
            <CheckCircle2 size={18} />
            <div><strong>Acceso protegido</strong><span>Verificación de JWT en rutas privadas</span></div>
          </div>

          <div className="dashboard-info-item">
            <CheckCircle2 size={18} />
            <div><strong>Sesión temporal</strong><span>El token tiene una duración limitada</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}