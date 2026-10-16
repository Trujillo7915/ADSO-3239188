// Contrato general CRUD (Crear, Leer, Actualizar, Eliminar)
export interface ICrud<T> {
  create(item: T): boolean;
  getAll(): T[];
  getById(id: number): T | undefined;
  update(id: number, item: T): boolean;
  delete(id: number): boolean;
}