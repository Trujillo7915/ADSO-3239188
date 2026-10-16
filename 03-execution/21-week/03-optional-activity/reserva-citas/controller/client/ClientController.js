import { Client } from "../../model/client/Client.js";
export class ClientController {
    constructor() {
        this.clients = [];
        this.nextId = 1;
        this.lastMessage = "";
        // Cliente de prueba inicial
        this.create(new Client(1, "CC", "10203040", "Carlos Ramírez", "Calle 10 # 15-20", "3001234567", "carlos@correo.com"));
    }
    // Crear cliente aplicando Lógica de Negocio (validaciones con operadores)
    create(client) {
        // Operadores lógicos: || (OR), === (igualdad), ! (NOT)
        if (client.type_document === "" ||
            client.document.trim() === "" ||
            client.name.trim() === "" ||
            client.email.trim() === "") {
            this.lastMessage = "Error: Todos los campos principales son obligatorios.";
            return false;
        }
        // Operador ! (NOT) y validación de correo
        if (!client.email.includes("@") || !client.email.includes(".")) {
            this.lastMessage = "Error: El correo electrónico no es válido.";
            return false;
        }
        // Operador === para evitar documentos duplicados
        const duplicate = this.clients.some((c) => c.document === client.document);
        if (duplicate === true) {
            this.lastMessage = "Error: Ya existe un cliente con ese número de documento.";
            return false;
        }
        // Operador matemático + para autoincrementar el ID
        client.id = this.nextId;
        this.nextId = this.nextId + 1;
        this.clients.push(client);
        this.lastMessage = "Cliente registrado correctamente.";
        return true;
    }
    getAll() {
        return this.clients;
    }
    getById(id) {
        return this.clients.find((c) => c.id === id);
    }
    update(id, item) {
        const index = this.clients.findIndex((c) => c.id === id);
        // Operador !== (diferente de)
        if (index !== -1) {
            this.clients[index] = item;
            return true;
        }
        return false;
    }
    delete(id) {
        const initialCount = this.clients.length;
        this.clients = this.clients.filter((c) => c.id !== id);
        // Operador < (menor que)
        return this.clients.length < initialCount;
    }
}
