import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';
import { AgregarItemMenuModalComponent } from 'src/app/ExtraComponents/agregar-item-menu-modal/agregar-item-menu-modal.component';
import { ConsultarItemMenuModalComponent } from 'src/app/ExtraComponents/consultar-item-menu-modal/consultar-item-menu-modal.component';
import { ModificarItemMenuModalComponent } from 'src/app/ExtraComponents/modficar-item-menu-modal/modficar-item-menu-modal.component';
import { ConfirmarAccionModalComponent } from 'src/app/ExtraComponents/confirmar-accion-modal/confirmar-accion-modal.component';
import { EliminarItemMenuModalComponent } from 'src/app/ExtraComponents/eliminar-item-menu-modal/eliminar-item-menu-modal.component';
import { Item } from 'src/app/models/item.model';
import { PageEvent } from '@angular/material/paginator';
import { GetAllItemMenuResponse, MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { catchError } from 'rxjs';
import { ActivarItemMenuModalComponent } from 'src/app/ExtraComponents/activar-item-menu-modal/activar-item-menu-modal/activar-item-menu-modal.component';

@Component({
  selector: 'app-back-office-menu',
  templateUrl: './back-office-menu.component.html',
  styleUrls: ['./back-office-menu.component.scss']
})
export class BackOfficeMenuComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'acciones'];
  dataSource!: MatTableDataSource<ItemMenu>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';


  constructor(public dialog: MatDialog, private errorHandler:ErrorHandlingService, private router: Router, private backofficeService: MenubackofficeService) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(campo?:any , valor?:any){
    this.backofficeService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next:(response: GetAllItemMenuResponse) => {
        const itemsFromResponse = response.items;
        // Recorremos el arreglo de ítems y lo procesamos
        const itemsToAdd = itemsFromResponse.map(item => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          categoria: item.grupo,
          imagen: item.imagen,
          activo: item.activo,
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

  openDialog(): void {
    
    const dialogRef = this.dialog.open(AgregarItemMenuModalComponent, {
      width: '30rem',
      // Puedes pasar data inicial si es necesario
    });
    dialogRef.afterClosed().subscribe(result => {
    });
}


abrirModal(item: any) {
  const dialogRef = this.dialog.open(ConsultarItemMenuModalComponent, {
    width: '30rem', // Ajusta el tamaño según tus necesidades
    data: item
    // data: { algunaData: 'data que desees pasar al modal' } // Opcional
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    // Lógica adicional que desees al cerrar el modal
  });
}
openModifyItemModal(item: any) {
  const dialogRef = this.dialog.open(ModificarItemMenuModalComponent, {
    width: '30rem',
    data: item
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí puedes manejar la lógica cuando se cierra el modal
      // Por ejemplo, enviar los cambios al servidor.
    }
  });
}

toggleItemVisibility(item: ItemMenu) {
  const dialogRef = this.dialog.open(ConfirmarAccionModalComponent, {
    width: '30rem',
    data: item // pasamos el ítem al modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
    }
  });
}

openDeleteDialog(item: ItemMenu): void {
  
  const dialogRef = this.dialog.open(EliminarItemMenuModalComponent, {
    width: '15rem',
    data: { item: item },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    this.getItems();
  });
}

openActivateDialog(item: ItemMenu){
  const dialogRef = this.dialog.open(ActivarItemMenuModalComponent, {
    width: '15rem',
    data: { item: item },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    this.getItems();
  });
}

navigateTo(route: string) {
  this.router.navigate([route]);
}

onPaginateChange(event: PageEvent) {
  this.pageEvent = event;
  
  this.getItems();
}

}
