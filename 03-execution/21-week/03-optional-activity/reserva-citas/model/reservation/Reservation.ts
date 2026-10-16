// 1. Interfaz (Contrato de datos de la Reserva)
export interface IReservation {
  id: number;
  name: string;
  description: string;
  client_id: number; // Dependencia / relación con la clase Client
}

// 2. Clase POO con Atributos y Constructor
export class Reservation implements IReservation {
  public id: number;
  public name: string;
  public description: string;
  public client_id: number;

  constructor(
    id: number,
    name: string,
    description: string,
    client_id: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.client_id = client_id;
  }
}
