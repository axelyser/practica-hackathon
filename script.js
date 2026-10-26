
const formulario = document.getElementById("formulario");
const entrada = document.getElementById("tarea");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

let tareas = JSON.parse(localStorage.getItem("tareas") || "[]");

function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    lista.replaceChildren();

    tareas.forEach((tarea, indice) => {
        const li = document.createElement("li");

        if (tarea.completada) {
            li.classList.add("completada");
        }

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.completada;

        casilla.addEventListener("change", () => {
            tareas[indice].completada = casilla.checked;
            guardar();
            mostrarTareas();
        });

        const texto = document.createElement("span");
        texto.textContent = `${tarea.nombre} (${tarea.prioridad})`;

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";

        eliminar.addEventListener("click", () => {
            tareas.splice(indice, 1);
            guardar();
            mostrarTareas();
        });

        li.append(casilla, texto, eliminar);
        lista.appendChild(li);
    });

    const pendientes = tareas.filter(t => !t.completada).length;
    contador.textContent = `${pendientes} tareas pendientes`;
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = entrada.value.trim();
    if (!nombre) return;

    tareas.push({
        nombre: nombre,
        prioridad: prioridad.value,
        completada: false
    });

    guardar();
    mostrarTareas();
    formulario.reset();
});

mostrarTareas();
