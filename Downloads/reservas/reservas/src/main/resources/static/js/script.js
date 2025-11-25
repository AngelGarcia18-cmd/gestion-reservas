let reservas = [];
let editIndex = -1;

// Guardar o Editar
document.getElementById("reservationForm").addEventListener("submit", function(e) {e.preventDefault();
            const cliente = document.getElementById("cliente").value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const personas = document.getElementById("personas").value;
            const reserva = { cliente, fecha, hora, personas };
            
            if (editIndex === -1) {
                reservas.push(reserva);
            } else {
                reservas[editIndex] = reservas;
                editIndex = -1;
            }
            
            this.reset();
            renderTable();
            
});

//Renderizar Tabla
function renderTable() {
    const tabla = document.getElementById("reservasTable");
    tabla.innerHTML = "";
    
    reservas.forEach((r, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${r.cliente}</td>
                <td>${r.fecha}</td>
                <td>${r.hora}</td>
                <td>${r.personas}</td>
                <td>
                    <button class="btn-edit" onclick="editReserva(${i})">Editar</button>
                    <button class="btn-delete" onclick="deleteReserva(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//Editar
function editReserva(i) {
    const r = reservas[i];
    document.getElementById("cliente").value = r.cliente;
    document.getElementById("fecha").value = r.fecha;
    document.getElementById("hora").value = r.hora;
    document.getElementById("personas").value = r.personas;
    editIndex = i;
}

//Eliminar
function deleteReserva(i) {
    reservas.splice(i, 1);
    renderTable();
}

//Buscar
document.getElementById("search").addEventListener("input", function() {
    const filtro = this.value.toLowerCase();
    const filas = document.querySelectorAll("#reservasTable tr");
    
    filas.forEach(fila => {
        const nombre = fila.children[0].textContent.toLowerCase();
        fila.style.display = nombre.includes(filtro) ? "" : "none";
    });
});
