import { ICrud } from "../../model/ICrud.js";
import { Reservation } from "../../model/reservation/Reservation.js";
import { ClientController } from "../client/ClientController.js";

export class ReservationController implements ICrud<Reservation> {
  private reservations: Reservation[] = [];
  private nextId: number = 101;
  private clientController: ClientController;
  public lastMessage: string = "";

  // Recibe el controlador de clientes por la dependencia de client_id
  constructor(clientController: ClientController) {
    this.clientController = clientController;
  }

  public create(reservation: Reservation): boolean {
    // Validación con operadores lógicos (||, ===, <=)
    if (
      reservation.name.trim() === "" ||
      reservation.description.trim() === "" ||
      reservation.client_id <= 0
    ) {
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

  public getAll(): Reservation[] {
    return this.reservations;
  }

  public getById(id: number): Reservation | undefined {
    return this.reservations.find((r) => r.id === id);
  }

  public update(id: number, item: Reservation): boolean {
    const index = this.reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.reservations[index] = item;
      return true;
    }
    return false;
  }

  public delete(id: number): boolean {
    const initialCount = this.reservations.length;
    this.reservations = this.reservations.filter((r) => r.id !== id);
    return this.reservations.length < initialCount;
  }
}