// ===============================
// SRID - Control de sesión
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  verificarSesion();
  mostrarUsuario();
});

function verificarSesion() {
  const sesionActiva = localStorage.getItem("sesionActiva");

  if (sesionActiva !== "true") {
    window.location.href = "login.html";
  }
}

function mostrarUsuario() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  const usuarioActivoSpan = document.getElementById("usuarioActivo");
  const saludoUsuario = document.getElementById("saludoUsuario");

  if (usuarioActivoSpan) {
    usuarioActivoSpan.textContent = `Usuario: ${usuarioActivo}`;
  }

  if (saludoUsuario) {
    saludoUsuario.textContent = `Hola, ${usuarioActivo}. Bienvenido a SRID - Gestión de mantenimiento industrial.`;
  }
}

function cerrarSesion() {
  localStorage.removeItem("sesionActiva");
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("usuarioId");

  window.location.href = "login.html";
}