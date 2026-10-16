export class ReservationController {
    // Recibe el controlador de clientes por la dependencia de client_id
    constructor(clientController) {
        this.reservations = [];
        this.nextId = 101;
        this.lastMessage = "";
        this.clientController = clientController;
    }
    create(reservation) {
        // Validación con operadores lógicos (||, ===, <=)
        if (reservation.name.trim() === "" ||
            reservation.description.trim() === "" ||
            reservation.client_id <= 0) {
            this.lastMessage = "Error: Complete todos los datos de la reserva.";
            return false;
        }
        // Validar que el cliente exista en el modelo antes de crear la reserva
        const clientExists = this.clientController.getById(reservation.client_id);
        if (!clientExists) {
            this.lastMessage = "Error: El cliente seleccionado no existe.";
            return false;
        }
        reservation.id = this.nextId;
        this.nextId = this.nextId + 1;
        this.reservations.push(reservation);
        this.lastMessage = `Reserva creada con éxito para ${clientExists.name}.`;
        return true;
    }
    getAll() {
        return this.reservations;
    }
    getById(id) {
        return this.reservations.find((r) => r.id === id);
    }
    update(id, item) {
        const index = this.reservations.findIndex((r) => r.id === id);
        if (index !== -1) {
            this.reservations[index] = item;
            return true;
        }
        return false;
    }
    delete(id) {
        const initialCount = this.reservations.length;
        this.reservations = this.reservations.filter((r) => r.id !== id);
        return this.reservations.length < initialCount;
    }
}
