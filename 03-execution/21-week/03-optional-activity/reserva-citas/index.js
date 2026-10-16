import { Client } from "./model/client/Client.js";
import { Reservation } from "./model/reservation/Reservation.js";
import { ClientController } from "./controller/client/ClientController.js";
import { ReservationController } from "./controller/reservation/ReservationController.js";
const clientCtrl = new ClientController();
const reservationCtrl = new ReservationController(clientCtrl);
const appContainer = document.getElementById("app-container");
const btnViewClients = document.getElementById("btn-view-clients");
const btnViewReservations = document.getElementById("btn-view-reservations");
// Función AJAX para cargar vistas HTML sin recargar la página
async function loadViewWithAjax(url, onLoaded) {
    try {
        const response = await fetch(url);
        const htmlContent = await response.text();
        appContainer.innerHTML = htmlContent;
        onLoaded();
    }
    catch (error) {
        appContainer.innerHTML = `<p>Error al cargar la vista con AJAX.</p>`;
    }
}
// ---------------- LÓGICA DE LA VISTA DE CLIENTES ----------------
function initClientView() {
    const tabBtnRegister = document.getElementById("tab-btn-register");
    const tabBtnList = document.getElementById("tab-btn-list");
    const sectionRegister = document.getElementById("section-client-register");
    const sectionList = document.getElementById("section-client-list");
    const form = document.getElementById("form-client");
    const msg = document.getElementById("client-msg");
    const tbody = document.getElementById("table-clients");
    // Cambiar al apartado Registrar Cliente
    tabBtnRegister.addEventListener("click", () => {
        sectionRegister.classList.remove("hidden");
        sectionList.classList.add("hidden");
        tabBtnRegister.className = "btn-gold";
        tabBtnList.className = "btn-outline";
    });
    // Cambiar al apartado Listado de Clientes
    tabBtnList.addEventListener("click", () => {
        sectionList.classList.remove("hidden");
        sectionRegister.classList.add("hidden");
        tabBtnList.className = "btn-gold";
        tabBtnRegister.className = "btn-outline";
        renderClients();
    });
    function renderClients() {
        const clients = clientCtrl.getAll();
        tbody.innerHTML = clients
            .map((c) => `
      <tr>
        <td>#${c.id}</td>
        <td>${c.type_document}</td>
        <td>${c.document}</td>
        <td><strong>${c.name}</strong></td>
        <td>${c.address}</td>
        <td>${c.phone}</td>
        <td>${c.email}</td>
        <td><button class="btn-delete" data-id="${c.id}">Eliminar</button></td>
      </tr>
    `)
            .join("");
        tbody.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = Number(e.target.getAttribute("data-id"));
                clientCtrl.delete(id);
                renderClients();
            });
        });
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const typeDoc = document.getElementById("client-type-doc").value;
        const doc = document.getElementById("client-doc").value;
        const name = document.getElementById("client-name").value;
        const address = document.getElementById("client-address").value;
        const phone = document.getElementById("client-phone").value;
        const email = document.getElementById("client-email").value;
        const newClient = new Client(0, typeDoc, doc, name, address, phone, email);
        const success = clientCtrl.create(newClient);
        msg.textContent = clientCtrl.lastMessage;
        msg.style.color = success ? "#dec068" : "#f87171";
        if (success) {
            form.reset();
            renderClients();
        }
    });
    renderClients();
}
// ---------------- LÓGICA DE LA VISTA DE RESERVAS ----------------
function initReservationView() {
    const tabResRegister = document.getElementById("tab-res-register");
    const tabResList = document.getElementById("tab-res-list");
    const sectionResRegister = document.getElementById("section-res-register");
    const sectionResList = document.getElementById("section-res-list");
    const form = document.getElementById("form-reservation");
    const selectClient = document.getElementById("res-client-id");
    const msg = document.getElementById("res-msg");
    const tbody = document.getElementById("table-reservations");
    tabResRegister.addEventListener("click", () => {
        sectionResRegister.classList.remove("hidden");
        sectionResList.classList.add("hidden");
        tabResRegister.className = "btn-gold";
        tabResList.className = "btn-outline";
    });
    tabResList.addEventListener("click", () => {
        sectionResList.classList.remove("hidden");
        sectionResRegister.classList.add("hidden");
        tabResList.className = "btn-gold";
        tabResRegister.className = "btn-outline";
        renderReservations();
    });
    const clients = clientCtrl.getAll();
    selectClient.innerHTML =
        `<option value="">Seleccione un cliente...</option>` +
            clients.map((c) => `<option value="${c.id}">${c.id} - ${c.name} (${c.document})</option>`).join("");
    function renderReservations() {
        const reservations = reservationCtrl.getAll();
        tbody.innerHTML = reservations
            .map((r) => {
            const client = clientCtrl.getById(r.client_id);
            const clientName = client ? client.name : "Desconocido";
            return `
        <tr>
          <td>#${r.id}</td>
          <td><strong>${r.name}</strong></td>
          <td>${r.description}</td>
          <td>${r.client_id}</td>
          <td>${clientName}</td>
          <td><button class="btn-delete" data-id="${r.id}">Eliminar</button></td>
        </tr>
      `;
        })
            .join("");
        tbody.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = Number(e.target.getAttribute("data-id"));
                reservationCtrl.delete(id);
                renderReservations();
            });
        });
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const clientId = Number(selectClient.value);
        const name = document.getElementById("res-name").value;
        const description = document.getElementById("res-description").value;
        const newRes = new Reservation(0, name, description, clientId);
        const success = reservationCtrl.create(newRes);
        msg.textContent = reservationCtrl.lastMessage;
        msg.style.color = success ? "#dec068" : "#f87171";
        if (success) {
            form.reset();
            renderReservations();
        }
    });
    renderReservations();
}
// ---------------- EVENTOS DEL MENÚ PRINCIPAL ----------------
btnViewClients.addEventListener("click", () => {
    btnViewClients.className = "btn-gold";
    btnViewReservations.className = "btn-outline";
    loadViewWithAjax("view/client/client.html", initClientView);
});
btnViewReservations.addEventListener("click", () => {
    btnViewReservations.className = "btn-gold";
    btnViewClients.className = "btn-outline";
    loadViewWithAjax("view/reservation/reservation.html", initReservationView);
});
// Vista inicial por defecto
loadViewWithAjax("view/client/client.html", initClientView);
