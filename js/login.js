// ===============================
// SRID - Login
// Autenticación simulada para prototipo
// ===============================

// "Tabla" de usuarios simulada
const usuarios = [
  {
    id: 1,
    usuario: "manuel",
    password: "1234"
  },
  {
    id: 2,
    usuario: "imanol",
    password: "1234"
  },
    {
    id: 3,
    usuario: "daniel",
    password: "1234"
  },
    {
    id: 4,
    usuario: "stiven",
    password: "1234"
  }
];

// Verificar si ya hay sesión iniciada
document.addEventListener("DOMContentLoaded", () => {
  const sesionActiva = localStorage.getItem("sesionActiva");

  if (sesionActiva === "true") {
    window.location.href = "dashboard.html";
  }
});

const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuarioInput = document.getElementById("usuario").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  limpiarMensaje();

  // 1. Validar campos obligatorios
  if (usuarioInput === "" || passwordInput === "") {
    mostrarMensaje("Todos los campos son obligatorios.", "error");
    return;
  }

  // 2. Simular autenticación (reemplaza backend/BD)
  const usuarioEncontrado = autenticarUsuario(usuarioInput, passwordInput);

  // 3. Validar credenciales
  if (!usuarioEncontrado) {
    mostrarMensaje("Credenciales incorrectas. Intente nuevamente.", "error");
    return;
  }

  // 4. Manejar sesión
  localStorage.setItem("sesionActiva", "true");
  localStorage.setItem("usuarioActivo", usuarioEncontrado.usuario);
  localStorage.setItem("usuarioId", usuarioEncontrado.id);

  mostrarMensaje("Inicio de sesión exitoso. Redirigiendo...", "success");

  // 5. Redirigir al sistema
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
});

// Función que simula el endpoint/backend de autenticación
function autenticarUsuario(usuario, password) {
  return usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

function limpiarMensaje() {
  mensaje.textContent = "";
  mensaje.className = "mensaje";
}