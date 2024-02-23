import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-item-menu-modal',
  templateUrl: './eliminar-item-menu-modal.component.html',
  styleUrls: ['./eliminar-item-menu-modal.component.scss']
})
export class EliminarItemMenuModalComponent {


  constructor(
    public dialogRef: MatDialogRef<EliminarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backofficeService: MenubackofficeService,
    private toastService: ToastService
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.backofficeService.remove(this.data.item.id)
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
