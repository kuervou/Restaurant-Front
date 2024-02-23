import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'eliminar-item-modal',
  templateUrl: './eliminar-item-modal.component.html',
  styleUrls: ['./eliminar-item-modal.component.scss']
})
export class EliminarItemModalComponent {


  constructor(
    public dialogRef: MatDialogRef<EliminarItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService: InventarioService,
    private toastService: ToastService
  ) {

  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.inventarioService.remove(this.data.item.id)
      .subscribe({
        next:(response) => {
          // La llamada al servicio fue exitosa, puedes manejar la respuesta aquí si es necesario.
          this.toastService.showSuccess("Item eliminado con exito");
          this.dialogRef.close(true);
        },
        error:(error) => {
        }});
  }
}
