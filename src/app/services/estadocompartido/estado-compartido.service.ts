import { Injectable } from '@angular/core';

export interface ItemSeleccionado {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstadoCompartidoService {
  itemsMenu: ItemSeleccionado[] = [];
  observaciones: string = "";

  constructor() { }

  // Método para actualizar los items del menú
  actualizarItemsMenu(items: ItemSeleccionado[]) {
    this.itemsMenu = items;
  }

  // Método para actualizar las observaciones
  actualizarObservaciones(obs: string) {
    this.observaciones = obs;
  }

  // Métodos adicionales según sean necesarios...
}
