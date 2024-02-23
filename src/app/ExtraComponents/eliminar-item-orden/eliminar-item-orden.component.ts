import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-item-orden',
  templateUrl: './eliminar-item-orden.component.html',
  styleUrls: ['./eliminar-item-orden.component.scss']
})
export class EliminarItemOrdenComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarItemOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private ordenService: OrdenService,
    private errorHandler:ErrorHandlingService
  ) {}

  ngOnInit(){
    console.log(this.data);
  }

  onConfirm() {
    if (this.data) { // Asegúrate de que data y data.itemId estén definidos
      const itemsParaEliminar = [this.data.item.id]; // Crea un arreglo con la ID del ítem
      
      // Llama al servicio y pasa el arreglo
      this.ordenService.removeItem(this.data.item.ordenId, itemsParaEliminar).subscribe({
        next: (response) => {
          this.toastService.showSuccess('Ítem eliminado exitosamente'); // Mensaje de éxito
          this.dialogRef.close(true); // Cierra el modal y pasa el valor 'true' como resultado
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          this.dialogRef.close(false); // Cierra el modal y pasa el valor 'false' como resultado
        }
      });
    } else {
      // Si no hay un itemId, muestra un error o maneja la situación como consideres necesario
      this.toastService.showError('No se encontró el ID del ítem');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
