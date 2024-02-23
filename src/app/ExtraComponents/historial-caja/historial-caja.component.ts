import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovimientosCajaModalComponent } from '../movimientos-caja-modal/movimientos-caja-modal.component';
import { PagosCajaModalComponent } from '../pagos-caja-modal/pagos-caja-modal.component';

@Component({
  selector: 'app-historial-caja',
  templateUrl: './historial-caja.component.html',
  styleUrls: ['./historial-caja.component.scss']
})
export class HistorialCajaComponent {

  constructor(public dialog: MatDialog) { }

  openHistorialMovimientosModal(): void {
    const dialogRef = this.dialog.open(MovimientosCajaModalComponent, {
      width: '70rem',
      height: '50rem'
    });
  
  }

  openHistorialPagosModal(): void {
    const dialogRef = this.dialog.open(PagosCajaModalComponent, {
      width: '70rem',
      height: '50rem'
    });
  
  }
}
