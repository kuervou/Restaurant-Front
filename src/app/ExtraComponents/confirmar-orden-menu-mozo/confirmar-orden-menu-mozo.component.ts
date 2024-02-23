import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-orden-menu-mozo',
  templateUrl: './confirmar-orden-menu-mozo.component.html',
  styleUrls: ['./confirmar-orden-menu-mozo.component.scss']
})
export class ConfirmarOrdenMenuMozoComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmarOrdenMenuMozoComponent>) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}
