import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AgregarCategoriaModalComponent } from 'src/app/ExtraComponents/agregar-categoria-modal/agregar-categoria-modal/agregar-categoria-modal.component';
import { EliminarCategoriaModalComponent } from 'src/app/ExtraComponents/eliminar-categoria-modal/eliminar-categoria-modal/eliminar-categoria-modal.component';
import { ModificarCategoriaModalComponent } from 'src/app/ExtraComponents/modificar-categoria-modal/modificar-categoria-modal/modificar-categoria-modal.component';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService, GetAllCategoriaResponse } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Categoria>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';

  constructor(public dialog: MatDialog, private categoriaService:CategoriaService, private errorHandler:ErrorHandlingService, private router: Router) {}

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(campo?:any , valor?:any){
    this.categoriaService.getAllCats(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next:(response: GetAllCategoriaResponse) => {
        const categoriasFromResponse = response.items;
        // Recorremos el arreglo de ítems y lo procesamos
        const categoriasToAdd = categoriasFromResponse.map(categoria => ({
          id: categoria.id,
          nombre: categoria.nombre,
          // Añade otras propiedades si es necesario
        }));
        
        // Agregamos los nuevos ítems al itemsArray
        this.itemsArray = [];
        this.itemsArray = [...this.itemsArray, ...categoriasToAdd];

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
  
  this.getCategorias();
}

onFilterChange(event: any) {
    this.filterField = event.value;
    this.filterValue = ''; // Resetear el valor de filtro
    if (this.filterField === 'categoriaId') { // Actualizar a 'categoriaId'
        this.applyFilter();
    }
}

onCategoryChange(event: any) {
  this.filterValue = event.value;
  this.applyFilter();
}

onSearchChange(value: string) {
  this.filterValue = value;
  this.applyFilter();
}

applyFilter() {
  if (this.filterField && this.filterValue) {
      this.getCategorias(this.filterField, this.filterValue);
  } else {
      this.getCategorias();
  }
}

openDialog(): void {
  const dialogRef = this.dialog.open(AgregarCategoriaModalComponent, {
    width: '30rem',
    data: {},  // Puedes pasar la data inicial aquí si es necesario.
    hasBackdrop: true,
    disableClose: false
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    this.getCategorias();
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}

openEditDialog(categoria: Categoria): void {
  const dialogRef = this.dialog.open(ModificarCategoriaModalComponent, {
    width: '30rem',
    data: categoria  // Pasa el ítem a modificar como dato.
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    this.getCategorias();
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar los cambios.
  });
}

openDeleteDialog(categoria: Categoria): void {
  
  const dialogRef = this.dialog.open(EliminarCategoriaModalComponent, {
    width: '15rem',
    data: { categoria: categoria },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getCategorias();
      // Aquí puedes eliminar el ítem
      // TODO: Añadir la lógica para eliminar el ítem
    }
  });
}

navigateTo(route: string) {
  this.router.navigate([route]);
}

}
