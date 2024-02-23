import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-observacion-orden-modal',
  templateUrl: './agregar-observacion-orden-modal.component.html',
  styleUrls: ['./agregar-observacion-orden-modal.component.scss']
})
export class AgregarObservacionOrdenModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AgregarObservacionOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onAddObservacion(): void {
    // Cierra el modal y devuelve la observación actualizada
    this.dialogRef.close(this.data.observacion);
  }

  onConfirm(): void {
    // Formatea la observación como "item.nombre: observacion"
    const observacionFormateada = `${this.data.item.nombre}: ${this.data.comentario}`;
    // Cierra el modal y devuelve la observación formateada
    this.dialogRef.close(observacionFormateada);
  }

  onCancel(): void {
    // Cierra el modal sin hacer cambios
    this.dialogRef.close();
  }
}
