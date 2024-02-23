import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-empleado-modal',
  templateUrl: './eliminar-empleado-modal.component.html',
  styleUrls: ['./eliminar-empleado-modal.component.scss']
})
export class EliminarEmpleadoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empleadoService: EmpleadoService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.empleadoService.remove(this.data.empleado.id)
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
