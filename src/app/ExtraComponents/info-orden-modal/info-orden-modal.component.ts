import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-info-orden-modal',
  templateUrl: './info-orden-modal.component.html',
  styleUrls: ['./info-orden-modal.component.scss']
})
export class InfoOrdenModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler: ErrorHandlingService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    console.log(this.data);

    // Procesa las observaciones cuando el componente se inicializa
    if (this.data && this.data.observaciones) {
      this.data.observaciones = this.procesarObservaciones(this.data.observaciones);
    }
  }

  // Función para procesar las observaciones
  procesarObservaciones(observaciones: string): string[] {
    return observaciones
      .split('&')
      .map(obs => obs.trim())
      .filter(obs => obs.length > 0);
  }
}
