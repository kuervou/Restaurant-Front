import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MesasService, UpdateMesaRequest } from 'src/app/services/mesas/mesas.service';


@Component({
  selector: 'app-liberar-mesa-modal',
  templateUrl: './liberar-mesa-modal.component.html',
  styleUrls: ['./liberar-mesa-modal.component.scss']
})
export class LiberarMesaModalComponent {

  constructor(
    public dialogRef: MatDialogRef<LiberarMesaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mesaService: MesasService) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Crear el objeto de solicitud para actualizar la mesa
    const updateRequest: UpdateMesaRequest = {
      libre: true // O false, dependiendo de la lógica de negocio
    };

    // Llamar al servicio para actualizar la mesa
    this.mesaService.update(this.data.mesa.id, updateRequest).subscribe(
      (response) => {
        // Manejo de la respuesta exitosa
        console.log('Mesa actualizada con éxito:', response);
        this.dialogRef.close('Mesa liberada'); // Puedes pasar un objeto si necesitas más datos
      },
      (error) => {
        // Manejo de errores
        console.error('Error al actualizar la mesa:', error);
        // Opcionalmente, puedes cerrar el diálogo con un valor que indique el error
        this.dialogRef.close('Error al liberar mesa');
      }
    );
  }
}