import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AgregarClienteModalComponent } from 'src/app/ExtraComponents/agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from 'src/app/ExtraComponents/editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from 'src/app/ExtraComponents/eliminar-cliente-modal/eliminar-cliente-modal.component';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService, GetAllClientesResponse } from 'src/app/services/cliente/cliente.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.scss']
})
export class GestionClientesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cuenta', 'contacto', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  ClientesArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';

  constructor(public dialog: MatDialog, private clienteService:ClienteService, private errorHandler:ErrorHandlingService, private router: Router) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes(campo?: any, valor?: any) {
    this.clienteService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next: (response: GetAllClientesResponse) => {
        const clientesFromResponse = response.items;
        const clientesToAdd = clientesFromResponse.map(cliente => ({
          id: cliente.id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          telefono: cliente.telefono,
          cuenta: cliente.cuenta,
          createdAt: cliente.createdAt,
          updatedAt: cliente.updatedAt
          // Añade otras propiedades si es necesario
        }));

        this.ClientesArray = [];
        this.ClientesArray = [...this.ClientesArray, ...clientesToAdd];

        this.totalCount = response.total;
        this.dataSource = new MatTableDataSource(this.ClientesArray);
      },
      error: (error) => {
        catchError(this.errorHandler.handleError);
      }
    });
  }

  onFilterChange(event: any) {
    this.filterField = event.value;
    this.filterValue = ''; // Resetear el valor de filtro
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
        this.getClientes(this.filterField, this.filterValue);
    } else {
        this.getClientes();
    }
} 

onPaginateChange(event: PageEvent) {
  this.pageEvent = event;
  
  this.getClientes();
}

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AgregarClienteModalComponent, {
      width: '30rem'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  openEditDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteModalComponent, {
      width: '30rem',
      data: { ...cliente } // pasamos una copia del empleado para evitar ediciones no deseadas
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes();
        // Aquí puedes manejar lo que quieras hacer cuando el modal se cierre, como actualizar el empleado en la lista o en una base de datos.
      }
    });
  }

  eliminarCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(EliminarClienteModalComponent, {
      width: '20rem',
      data: {cliente}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes();
        console.log(`Cliente ${cliente.nombre} eliminado`);
      } else {
        console.log('Operación cancelada');
      }
    });
  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
