import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-activar-item-menu-modal',
  templateUrl: './activar-item-menu-modal.component.html',
  styleUrls: ['./activar-item-menu-modal.component.scss']
})
export class ActivarItemMenuModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ActivarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backofficeService: MenubackofficeService,
    private toastService: ToastService
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.backofficeService.activar(this.data.item.id)
      .subscribe({
        next:(response) => {
          // La llamada al servicio fue exitosa, puedes manejar la respuesta aquí si es necesario.
          this.toastService.showSuccess("Item activado con exito");
          this.dialogRef.close(true);
        },
        error:(error) => {
        }});
  }
}
