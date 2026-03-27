const form = document.getElementById("formRegistrarMaquina");
const mensaje = document.getElementById("mensaje");
const listaMaquinas = document.getElementById("listaMaquinas");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const usuarioActivo = document.getElementById("usuarioActivo");

let maquinas = JSON.parse(localStorage.getItem("maquinas")) || [];

const usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {
  nombre: "Administrador"
};

usuarioActivo.textContent = usuario.nombre;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const frecuencia = document.getElementById("frecuencia").value.trim();

  mensaje.textContent = "";
  mensaje.className = "mensaje";

  if (!nombre || !tipo || !modelo || !frecuencia) {
    mensaje.textContent = "Todos los campos son obligatorios.";
    mensaje.classList.add("error");
    return;
  }

  const maquinaExistente = maquinas.some(
    (maquina) =>
      maquina.nombre.toLowerCase() === nombre.toLowerCase() &&
      maquina.modelo.toLowerCase() === modelo.toLowerCase()
  );

  if (maquinaExistente) {
    mensaje.textContent = "La máquina ya está registrada.";
    mensaje.classList.add("error");
    return;
  }

  const nuevaMaquina = {
    id: Date.now(),
    nombre,
    tipo,
    modelo,
    frecuencia
  };

  maquinas.push(nuevaMaquina);
  localStorage.setItem("maquinas", JSON.stringify(maquinas));

  mensaje.textContent = "Máquina registrada correctamente.";
  mensaje.classList.add("success");

  form.reset();
  renderMaquinas();
});

function renderMaquinas() {
  listaMaquinas.innerHTML = "";

  if (maquinas.length === 0) {
    listaMaquinas.innerHTML = "<p>No hay máquinas registradas.</p>";
    return;
  }

  maquinas.forEach((maquina) => {
    const card = document.createElement("div");
    card.className = "dashboard-card";
    card.style.marginBottom = "16px";
    card.style.padding = "16px";

    card.innerHTML = `
      <h3>${maquina.nombre}</h3>
      <p><strong>Tipo:</strong> ${maquina.tipo}</p>
      <p><strong>Modelo:</strong> ${maquina.modelo}</p>
      <p><strong>Frecuencia:</strong> ${maquina.frecuencia}</p>
      <button class="btn-secondary" onclick="eliminarMaquina(${maquina.id})">
        Eliminar
      </button>
    `;

    listaMaquinas.appendChild(card);
  });
}

function eliminarMaquina(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta máquina?");
  if (!confirmar) return;

  maquinas = maquinas.filter((maquina) => maquina.id !== id);
  localStorage.setItem("maquinas", JSON.stringify(maquinas));

  mensaje.textContent = "Máquina eliminada correctamente.";
  mensaje.className = "mensaje success";

  renderMaquinas();
}

btnCerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
});

renderMaquinas();