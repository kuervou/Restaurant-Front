import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mesa } from 'src/app/models/mesa.model';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-mesa-modal',
  templateUrl: './eliminar-mesa-modal.component.html',
  styleUrls: ['./eliminar-mesa-modal.component.scss']
})
export class EliminarMesaModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarMesaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mesa: Mesa},
    private mesaService: MesasService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.mesaService.remove(this.data.mesa.id)
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
