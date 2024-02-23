import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { itemSeleccionado } from 'src/app/components/home-menu/home-menu.component';
import { ItemMenuResponse } from 'src/app/services/menubackoffice/menubackoffice.service';

interface DialogData {
  item: ItemMenuResponse;
  itemsMenu: itemSeleccionado[];
  observaciones: string;
}


@Component({
  selector: 'app-seleccionar-item-menu',
  templateUrl: './seleccionar-item-menu.component.html',
  styleUrls: ['./seleccionar-item-menu.component.scss']
})
export class SeleccionarItemMenuComponent {
  observacionesTemp: string = "";
  cantidad: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<SeleccionarItemMenuComponent>,) {}

  // Función para calcular el total
  getTotal(): number {
    return this.cantidad * this.data.item.precio;
  }

  // Funciones para incrementar y decrementar la cantidad
  incrementarCantidad() {
    this.cantidad++;
  }

  decrementarCantidad() {
    if (this.cantidad >= 1) { // Asumiendo que no puede haber cantidad menor a 1
      this.cantidad--;
    }
  }

  agregarALaOrden() {
    if (this.cantidad > 0) {
      const nuevoItemSeleccionado: itemSeleccionado = {
        id: this.data.item.id,
        nombre: this.data.item.nombre,
        precio: this.data.item.precio,
        cantidad: this.cantidad,
        // Puedes agregar más propiedades si son necesarias
      };
  
      this.data.itemsMenu.push(nuevoItemSeleccionado);
  
      // Si el campo de observaciones no está vacío, agregamos las observaciones
      if (this.observacionesTemp.trim() !== "") {
        // Formato de observación "nombre: observación"
        const observacionFormateada = `${this.data.item.nombre}:${this.observacionesTemp}`;
  
        // Verifica si ya hay observaciones existentes
        if (this.data.observaciones === "") {
          // Si observaciones está vacío, agrega la nueva observación directamente
          this.data.observaciones = observacionFormateada;
        } else {
          // Si ya hay datos, agrega "&" antes de la nueva observación formateada
          this.data.observaciones += ` & ${observacionFormateada}`;
        }
      }
  
      // Limpia el campo de observaciones después de agregarlo
      this.observacionesTemp = "";
  
      // Aquí puedes cerrar el modal o realizar alguna otra acción necesaria después de agregar el item

      this.dialogRef.close({
        itemsMenu: this.data.itemsMenu,
        observaciones: this.data.observaciones
      });
    }
  }
}
