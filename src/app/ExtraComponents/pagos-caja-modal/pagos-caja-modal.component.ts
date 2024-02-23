import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pago } from 'src/app/models/pago.model';
import { CajaService } from 'src/app/services/caja/caja.service';

@Component({
  selector: 'app-pagos-caja-modal',
  templateUrl: './pagos-caja-modal.component.html',
  styleUrls: ['./pagos-caja-modal.component.scss']
})
export class PagosCajaModalComponent {

  displayedColumns: string[] = ['ordenId', 'metodoPago', 'total','fecha','hora'];
  dataSource!: MatTableDataSource<Pago>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};

  constructor(
    public dialogRef: MatDialogRef<PagosCajaModalComponent>,
    private cajaService: CajaService
  ) {}

  ngOnInit() {
    this.getPagos();
  }

  getPagos() {
    // Aquí asumimos que ya tienes un ID de caja definido.
    const cajaId = 1;
    this.cajaService.getPagosCaja(cajaId, this.pageEvent.pageIndex + 1, this.pageEvent.pageSize).subscribe({
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
    this.getPagos();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
