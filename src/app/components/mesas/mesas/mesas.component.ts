import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AgregarMesaModalComponent } from 'src/app/ExtraComponents/agregar-mesa-modal/agregar-mesa-modal/agregar-mesa-modal.component';
import { EliminarMesaModalComponent } from 'src/app/ExtraComponents/eliminar-mesa-modal/eliminar-mesa-modal/eliminar-mesa-modal.component';
import { ModificarMesaModalComponent } from 'src/app/ExtraComponents/modificar-mesa-modal/modificar-mesa-modal/modificar-mesa-modal.component';
import { Mesa } from 'src/app/models/mesa.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllMesasResponse, MesasResponse, MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent {
  displayedColumns: string[] = ['id', 'nroMesa', 'acciones'];
  dataSource!: MatTableDataSource<Mesa>;
  mesas: Mesa[] = [];

  constructor(public dialog: MatDialog, private mesaService:MesasService, private errorHandler:ErrorHandlingService, private router: Router) {}

  ngOnInit() {
    this.getMesas();
  }

  getMesas() {
    this.mesaService.getAll().subscribe({
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
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarMesaModalComponent, {
      width: '30rem',
      data: {},  // Puedes pasar la data inicial aquí si es necesario.
      hasBackdrop: true,
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      this.getMesas();
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditDialog(mesa: Mesa): void {
    const dialogRef = this.dialog.open(ModificarMesaModalComponent, {
      width: '30rem',
      data: mesa  // Pasa el ítem a modificar como dato.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      this.getMesas();
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar los cambios.
    });
  }

  openDeleteDialog(mesa: Mesa): void {
  
    const dialogRef = this.dialog.open(EliminarMesaModalComponent, {
      width: '15rem',
      data: { mesa: mesa },  // Pasamos el ítem completo al modal
    }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMesas();
        // Aquí puedes eliminar el ítem
        // TODO: Añadir la lógica para eliminar el ítem
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
