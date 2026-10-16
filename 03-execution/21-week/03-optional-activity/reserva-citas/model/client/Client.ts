// 1. Interfaz (Contrato de datos del Cliente)
export interface IClient {
  id: number;
  type_document: string;
  document: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

// 2. Clase POO con Atributos y Constructor
export class Client implements IClient {
  public id: number;
  public type_document: string;
  public document: string;
  public name: string;
  public address: string;
  public phone: string;
  public email: string;

  constructor(
    id: number,
    type_document: string,
    document: string,
    name: string,
    address: string,
    phone: string,
    email: string
  ) {
    this.id = id;
    this.type_document = type_document;
    this.document = document;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}