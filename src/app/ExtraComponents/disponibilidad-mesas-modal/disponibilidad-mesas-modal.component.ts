import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { Mesa } from 'src/app/models/mesa.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllMesasResponse, MesasResponse, MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-disponibilidad-mesas-modal',
  templateUrl: './disponibilidad-mesas-modal.component.html',
  styleUrls: ['./disponibilidad-mesas-modal.component.scss']
})
export class DisponibilidadMesasModalComponent implements OnInit {


  displayedColumns: string[] = ['mesa', 'estado'];
  mesas: Mesa[] = [];
  dataSource!: MatTableDataSource<Mesa>;


  constructor(public dialogRef: MatDialogRef<DisponibilidadMesasModalComponent>,private mesasService: MesasService, private errorHandler: ErrorHandlingService) { }

  ngOnInit() {
    this.getMesas();
  }

  getMesas() {
    this.mesasService.getAll().subscribe({
      next: (response: GetAllMesasResponse) => {
        if (Array.isArray(response)) {
          const mesas: MesasResponse[] = response.map((mesa) => ({
            id: mesa.id,
            nroMesa: mesa.nroMesa,
            libre: mesa.libre,
            createdAt: mesa.createdAt,
            updatedAt: mesa.updatedAt,
            // Añade otras propiedades si es necesario
          }));
          this.mesas = mesas; // Asignar el resultado mapeado a la variable de categorías
          console.log(this.mesas);
          this.dataSource = new MatTableDataSource(this.mesas); 
        } else {
          console.error('La respuesta del servicio no es un array válido.');
        }
      },
      error: (error) => {
        catchError(this.errorHandler.handleError);
      },
    });
  }

  onClose(){
    this.dialogRef.close();
  }
}
