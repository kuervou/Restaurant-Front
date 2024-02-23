import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { OrdenService, UpdateOrdenRequest } from 'src/app/services/orden/orden.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-confirmar-cancelar-orden-modal',
  templateUrl: './confirmar-cancelar-orden-modal.component.html',
  styleUrls: ['./confirmar-cancelar-orden-modal.component.scss']
})
export class ConfirmarCancelarOrdenModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarCancelarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id : number},
    private ordenService: OrdenService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.ordenService.deleteOrden(this.data.id).subscribe({
      next: (response) => {
        console.log('Orden eliminada, respuesta:', response);
        this.toastService.showSuccess("Orden cancelada con éxito");
        // Actualizar la lista de órdenes aquí si es necesario
      },
      error: (error) => {
        console.error('Hubo un error al eliminar la orden:', error);
        // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
    });
  }
}
