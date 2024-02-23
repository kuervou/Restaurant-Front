import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pago } from 'src/app/models/pago.model';
import { EmpleadoResponse, EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { PagoService } from 'src/app/services/pago/pago.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-pagos-orden-caja-modal',
  templateUrl: './pagos-orden-caja-modal.component.html',
  styleUrls: ['./pagos-orden-caja-modal.component.scss']
})
export class PagosOrdenCajaModalComponent {
  empleados: { [key: number]: EmpleadoResponse } = {};

  constructor(public dialogRef: MatDialogRef<PagosOrdenCajaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    private empleadoService: EmpleadoService,
    private pagoService: PagoService,
    private toastService: ToastService,
    ) { }

    ngOnInit():void{
      this.getEmpleados();
    }

    getEmpleados(): void {
      this.data.estadoPagos.infoPagos.forEach((pago: Pago) => {
        this.empleadoService.getById(pago.empleadoId).subscribe({
          next: (empleado: EmpleadoResponse) => {
            // Suponiendo que EmpleadoResponse es el tipo que devuelve tu empleadoService
            this.empleados[pago.empleadoId] = empleado;
          },
          error: err => {
            this.errorHandler.handleError(err);
            console.error('Error al obtener el empleado:', err);
          }
        });
      });
    }

    cancelarPago(itemPago: number) {
      // Asumiendo que itemPago contiene una propiedad id que es el ID del pago
      
      this.pagoService.deletePago(itemPago).subscribe({
        next: (response) => {
          // Maneja la respuesta exitosa, por ejemplo, mostrando un mensaje y cerrando el diálogo
          this.toastService.showSuccess(response.message);
          this.dialogRef.close(true); // Cierra el modal con un resultado positivo
        },
        error: (error) => {
          // Maneja el error, por ejemplo, mostrando un mensaje de error
          this.toastService.showError('Error al cancelar el pago: ' + error);
        }
      });
    }
    
}
