import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AgregarGrupoModalComponent } from 'src/app/ExtraComponents/agregar-grupo-modal/agregar-grupo-modal/agregar-grupo-modal.component';
import { EliminarGrupoModalComponent } from 'src/app/ExtraComponents/eliminar-grupo-modal/eliminar-grupo-modal/eliminar-grupo-modal.component';
import { ModificarGrupoModalComponent } from 'src/app/ExtraComponents/modificar-grupo-modal/modificar-grupo-modal/modificar-grupo-modal.component';
import { Grupo } from 'src/app/models/grupo.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllGruposResponse, GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Grupo>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';

  constructor(public dialog: MatDialog, private grupoService: GrupoComidaService, private errorHandler:ErrorHandlingService, private router: Router) {}

  ngOnInit() {
    this.getGrupos();
  }

  getGrupos(campo?:any , valor?:any){
    this.grupoService.getAllGrupos(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next:(response: GetAllGruposResponse) => {
        const gruposFromResponse = response.items;
        // Recorremos el arreglo de ítems y lo procesamos
        const gruposToAdd = gruposFromResponse.map(grupo => ({
          id: grupo.id,
          nombre: grupo.nombre,
          esBebida: grupo.esBebida
          // Añade otras propiedades si es necesario
        }));
        
        // Agregamos los nuevos ítems al itemsArray
        this.itemsArray = [];
        this.itemsArray = [...this.itemsArray, ...gruposToAdd];

        this.totalCount = response.total;
        this.dataSource = new MatTableDataSource(this.itemsArray);
        
      },
      error:(error) => {
        catchError(this.errorHandler.handleError);
      }
    });
}

onPaginateChange(event: PageEvent) {
  this.pageEvent = event;
  
  this.getGrupos();
}

onFilterChange(event: any) {
    this.filterField = event.value;
    this.filterValue = ''; // Resetear el valor de filtro
    if (this.filterField === 'grupoId') { // Actualizar a 'categoriaId'
        this.applyFilter();
    }
}

onGrupoChange(event: any) {
  this.filterValue = event.value;
  this.applyFilter();
}

onSearchChange(value: string) {
  this.filterValue = value;
  this.applyFilter();
}

applyFilter() {
  if (this.filterField && this.filterValue) {
      this.getGrupos(this.filterField, this.filterValue);
  } else {
      this.getGrupos();
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(AgregarGrupoModalComponent, {
    width: '30rem',
    data: {},  // Puedes pasar la data inicial aquí si es necesario.
    hasBackdrop: true,
    disableClose: false
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    this.getGrupos();
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}

openEditDialog(grupo: Grupo): void {
  const dialogRef = this.dialog.open(ModificarGrupoModalComponent, {
    width: '30rem',
    data: grupo  // Pasa el ítem a modificar como dato.
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    this.getGrupos();
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar los cambios.
  });
}

openDeleteDialog(grupo: Grupo): void {
  const dialogRef = this.dialog.open(EliminarGrupoModalComponent, {
    width: '15rem',
    data: { grupo: grupo },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getGrupos();
      // Aquí puedes eliminar el ítem
      // TODO: Añadir la lógica para eliminar el ítem
    }
  });
}

navigateTo(route: string) {
  this.router.navigate([route]);
}

}
