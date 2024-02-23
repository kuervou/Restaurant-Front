import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { Orden } from 'src/app/models/orden.model';
import { ItemMenuResponse } from 'src/app/services/menubackoffice/menubackoffice.service';
import { ItemOrden } from 'src/app/models/itemOrden.model';
import { PagoService } from 'src/app/services/pago/pago.service';
import { METODOSPAGO } from 'src/app/constants/metodosPago.constant';
@Component({
  selector: 'app-pagar-orden-modal',
  templateUrl: './pagar-orden-modal.component.html',
  styleUrls: ['./pagar-orden-modal.component.scss'],
})
export class PagarOrdenModalComponent {
  partialPayment: boolean = false;
  tipoPago: 'total' | 'parcial' = 'total';
  metodoPago: string = METODOSPAGO.EFECTIVO;
  montoParcial: number = 0;
  orden: Orden;

  metodosPago = [
    { value: METODOSPAGO.EFECTIVO, viewValue: METODOSPAGO.EFECTIVO },
    { value: METODOSPAGO.TRANSFERENCIA, viewValue: METODOSPAGO.TRANSFERENCIA },
    { value: METODOSPAGO.CREDITO, viewValue: METODOSPAGO.CREDITO}
    // Puedes seguir añadiendo más métodos de pago si es necesario
  ];

  itemsOrden: ItemOrden[] = []; // inicializa como un array vacío
  totalOrden: number = 0;
  observaciones: string[] = [];
  fechaActual: Date = new Date();

  displayedColumns: string[] = [
    'cantidad',
    'producto',
    'precioUnitario',
    'precioTotal',
  ];

  constructor(
    private dialogRef: MatDialogRef<PagarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pagoService: PagoService
  ) {
    // Si la data es necesaria para inicializar componentes, podrías asignarla aquí.
    this.orden = this.data.orden;
    console.log(this.orden);
  }

  ngOnInit() {
    this.itemsOrden = this.orden.items.map((item) => ({
      id: item.id,
      ordenId: item.ordenId,
      itemMenuId: item.itemMenuId,
      cantidad: item.cantidad,
      producto: item.itemMenu.nombre,
      precioUnitario: item.precio,
      precioTotal: item.cantidad * item.precio,
      precio: item.precio,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      itemMenu: item.itemMenu,
    }));

    this.totalOrden = this.orden?.total;

    this.observaciones = [this.orden.observaciones];
  }

  onConfirmarPago() {
    const ahora = new Date();

    const fecha = `${ahora.getFullYear()}-${String(
      ahora.getMonth() + 1
    ).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;

    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(
      ahora.getMinutes()
    ).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    const createPagoRequest = {
      fecha: fecha,
      hora: hora,
      metodoPago: this.metodoPago,
      total: this.getAmount(),
      //obtenemos el id del empleado de la local storage
      empleadoId: JSON.parse(localStorage.getItem('empleadoId') || '{}'),
      //El id de la caja es 1 por defecto
      cajaId: 1,
      ordenId: this.orden.id,
    };
    console.log(createPagoRequest);

    // Llamamos al servicio de pagos para crear el nuevo pago
    this.pagoService.crearPago(createPagoRequest).subscribe({
      next: (response) => {
        console.log(response);
        // Aquí manejarías la respuesta y, por ejemplo, cerrarías el modal con éxito
        this.dialogRef.close({
          status: 'paid',
          paymentDetails: response.nuevoPago,
        });
      },
      error: (error) => {
        // Aquí manejarías el error
        console.error(error);
      },
    });
  }

  onCancelar() {
    // Cierra el diálogo sin realizar acciones
    this.dialogRef.close({ status: 'cancelled' });
  }

  getAmount() {
    if (this.tipoPago === 'total') {
      return this.totalOrden;
    } else {
      return this.montoParcial;
    }
  }
}
