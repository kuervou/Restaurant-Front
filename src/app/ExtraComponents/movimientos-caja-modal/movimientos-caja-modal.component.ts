import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movimiento } from 'src/app/models/movimiento.model';
import { Time } from "@angular/common";
import { CajaService } from 'src/app/services/caja/caja.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movimientos-caja-modal',
  templateUrl: './movimientos-caja-modal.component.html',
  styleUrls: ['./movimientos-caja-modal.component.scss']
})
export class MovimientosCajaModalComponent {

  displayedColumns: string[] = ['tipo', 'total', 'observacion','fecha','hora'];
  dataSource!: MatTableDataSource<Movimiento>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};

  constructor(
    public dialogRef: MatDialogRef<MovimientosCajaModalComponent>,
    private cajaService: CajaService
  ) {}

  ngOnInit() {
    this.getMovimientos();
  }

  getMovimientos() {
    // Aquí asumimos que ya tienes un ID de caja definido.
    const cajaId = 1;
    this.cajaService.getMovimientosCaja(cajaId, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response.items);
        this.totalCount = response.total;
      },
      error: (error) => {
        // Manejar el error
      }
    });
  }

 onPaginateChange(event: PageEvent) {
  this.pageEvent = event;
  this.getMovimientos();
}
  
closeModal(): void {
  this.dialogRef.close();
}
  
}
