import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-categoria-modal',
  templateUrl: './eliminar-categoria-modal.component.html',
  styleUrls: ['./eliminar-categoria-modal.component.scss']
})
export class EliminarCategoriaModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarCategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {categoria: Categoria},
    private categoriaService: CategoriaService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.categoriaService.remove(this.data.categoria.id)
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
