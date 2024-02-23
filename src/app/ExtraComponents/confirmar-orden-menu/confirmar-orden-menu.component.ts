import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExitoOrdenMenuComponent } from '../exito-orden-menu/exito-orden-menu.component';
import { itemSeleccionado } from 'src/app/components/home-menu/home-menu.component';
import { CreateOrdenClienteRequest, OrdenService } from 'src/app/services/orden/orden.service';
import { EstadoCompartidoService } from 'src/app/services/estadocompartido/estado-compartido.service';

@Component({
  selector: 'app-confirmar-orden-menu',
  templateUrl: './confirmar-orden-menu.component.html',
  styleUrls: ['./confirmar-orden-menu.component.scss']
})
export class ConfirmarOrdenMenuComponent {
  nombreCliente: string = '';
  cantidadComensales: number = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmarOrdenMenuComponent>,
    private ordenService: OrdenService,
    private estadoCompartidoService: EstadoCompartidoService,
    @Inject(MAT_DIALOG_DATA) public data: { itemsMenu: itemSeleccionado[], observaciones: string, totalOrden: number }
  ) { }

  crearOrden() {
    if (!this.nombreCliente.trim()) {
      // Puedes usar una alerta simple o tu propio sistema de notificaciones para informar al usuario
      alert('Por favor, ingresa el nombre del responsable.');
      return; // Detiene la ejecución adicional del método
    }

    // Validación para la cantidad de comensales.
    if (this.cantidadComensales < 0 || this.cantidadComensales > 50) {
      alert('La cantidad de comensales debe ser entre 0 y 50.');
      return;
    }

    //Primero mapeamos los items
    const itemsParaEnvio = this.data.itemsMenu.map(item => ({
      itemMenuId: item.id,
      cantidad: item.cantidad,
      precio: item.precio
    }));

    //Fecha y hora
    const ahora = new Date();

    const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;

    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    //Buscamos el numero mesa en la local storage
    const numeroMesa = localStorage.getItem('numeroMesa');

    //Creamos la request
    const orderRequest: CreateOrdenClienteRequest = {
      fecha: fecha,
      hora: hora,
      responsable: this.nombreCliente,
      ocupacion: this.cantidadComensales,
      observaciones: this.data.observaciones,
      items: itemsParaEnvio,
      mesas: numeroMesa ? [parseInt(numeroMesa)] : []
    };

    // Usamos el servicio para enviar la solicitud al backend
    this.ordenService.createCliente(orderRequest).subscribe({
      next: (response) => {
        // Manejar la respuesta exitosa aquí si es necesario
        console.log('Orden creada con éxito', response);

        this.estadoCompartidoService.actualizarItemsMenu([]);
        this.estadoCompartidoService.actualizarObservaciones("");

        // Cierra el modal actual
        this.dialogRef.close();

        // Opcionalmente, abrir el modal de éxito aquí o manejar la navegación
        this.openModalExito();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Error al crear la orden', error);
      }
    });

    console.log(orderRequest);
  }

  openModalExito(): void {
    const dialogRef = this.dialog.open(ExitoOrdenMenuComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado', result);
    });
  }
}
