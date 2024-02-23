import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar-orden-caja',
  templateUrl: './confirmar-eliminar-orden-caja.component.html',
  styleUrls: ['./confirmar-eliminar-orden-caja.component.scss']
})
export class ConfirmarEliminarOrdenCajaComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarEliminarOrdenCajaComponent>) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}
