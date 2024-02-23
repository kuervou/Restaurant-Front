import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AgregarEmpleadoModalComponent } from 'src/app/ExtraComponents/agregar-empleado-modal/agregar-empleado-modal.component';
import { EditarEmpleadoModalComponent } from 'src/app/ExtraComponents/editar-empleado-modal/editar-empleado-modal.component';
import { EliminarEmpleadoModalComponent } from 'src/app/ExtraComponents/eliminar-empleado-modal/eliminar-empleado-modal.component';
import { ResetPasswordModalComponent } from 'src/app/ExtraComponents/reset-password-modal/reset-password-modal.component';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService, GetAllEmpleadosResponse } from 'src/app/services/empleado/empleado.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.scss']
})
export class GestionEmpleadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'rol', 'contacto', 'acciones'];
  dataSource!: MatTableDataSource<Empleado>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';
  roles: string[] = ['Admin', 'Mozo', 'Cocina'];

  constructor(public dialog: MatDialog, private router: Router, private empleadosService:EmpleadoService, private errorHandler:ErrorHandlingService) {}

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(campo?:any , valor?:any){
    this.empleadosService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next:(response: GetAllEmpleadosResponse) => {
        const itemsFromResponse = response.items;
        // Recorremos el arreglo de ítems y lo procesamos
        const itemsToAdd = itemsFromResponse.map(item => ({
          id: item.id,
          nick: item.nick,
          nombre: item.nombre,
          apellido: item.apellido,
          telefono: item.telefono,
          rol: item.rol,
          // Añade otras propiedades si es necesario
        }));
        
        // Agregamos los nuevos ítems al itemsArray
        this.itemsArray = [];
        this.itemsArray = [...this.itemsArray, ...itemsToAdd];

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
  
  this.getEmpleados();
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
        this.getEmpleados(this.filterField, this.filterValue);
    } else {
        this.getEmpleados();
    }
}

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AgregarEmpleadoModalComponent, {
      width: '30rem',
      data: {},  // Puedes pasar la data inicial aquí si es necesario.
      hasBackdrop: true,
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.getEmpleados();
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditDialog(empleado: Empleado): void {
    const dialogRef = this.dialog.open(EditarEmpleadoModalComponent, {
      width: '30rem',
      data: { ...empleado } // pasamos una copia del empleado para evitar ediciones no deseadas
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmpleados();
        // Aquí puedes manejar lo que quieras hacer cuando el modal se cierre, como actualizar el empleado en la lista o en una base de datos.
      }
    });
  }

  eliminarEmpleado(empleado: Empleado) {
    const dialogRef = this.dialog.open(EliminarEmpleadoModalComponent, {
      width: '20rem',
      data: {empleado: empleado}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí se coloca la lógica para eliminar el empleado
        // Por ejemplo: this.empleadosService.eliminar(empleado.id);
        console.log(`Empleado ${empleado.nombre} eliminado`);
        this.getEmpleados();
      } else {
        console.log('Operación cancelada');
      }
    });
  }

  openResetPasswordModal(idEmpleado: number): void {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '15rem',
      data: { userId: idEmpleado } // Si necesitas pasar datos
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contiene la contraseña actual y la nueva
        console.log('Dialog result:', result);
        // Aquí puedes llamar al servicio para cambiar la contraseña
      }
    });
  }
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  
}