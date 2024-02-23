import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-modificar-orden',
  templateUrl: './confirmar-modificar-orden.component.html',
  styleUrls: ['./confirmar-modificar-orden.component.scss']
})
export class ConfirmarModificarOrdenComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarModificarOrdenComponent>) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}
