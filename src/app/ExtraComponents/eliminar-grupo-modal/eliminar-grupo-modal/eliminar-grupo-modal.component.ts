import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EliminarCategoriaModalComponent } from '../../eliminar-categoria-modal/eliminar-categoria-modal/eliminar-categoria-modal.component';
import { Grupo } from 'src/app/models/grupo.model';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-grupo-modal',
  templateUrl: './eliminar-grupo-modal.component.html',
  styleUrls: ['./eliminar-grupo-modal.component.scss']
})
export class EliminarGrupoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarCategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {grupo: Grupo},
    private grupoService: GrupoComidaService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.grupoService.remove(this.data.grupo.id)
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
