import { Categoria } from "./categoria.model";

export interface Item {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: Categoria;
    stock: number;
    costo: number;
    cantxCasillero: number;
    porUnidad: boolean;
  }
  