const API = "/api/auth";

export async function iniciarSesion(username, password) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error al iniciar sesión");
  return data;
}

export async function obtenerDashboard(token) {
  const response = await fetch(`${API}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Sesión inválida o expirada");
  return response.json();
}