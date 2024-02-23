import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eliminar-cliente-modal',
  templateUrl: './eliminar-cliente-modal.component.html',
  styleUrls: ['./eliminar-cliente-modal.component.scss']
})
export class EliminarClienteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cliente: Cliente},
    private clienteService: ClienteService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    // Llamamos a la función remove del servicio InventarioService y le pasamos la ID del item.
    this.clienteService.remove(this.data.cliente.id)
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
