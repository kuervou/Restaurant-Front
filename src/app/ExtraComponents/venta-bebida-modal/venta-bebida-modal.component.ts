import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { MenuMozoService, ItemMenuResponse } from 'src/app/services/menumozo/menu-mozo.service';
import { GRUPOSVENTARAPIDA } from 'src/app/constants/gruposVentaRapida';
import { forkJoin, map } from 'rxjs';
import { ClienteResponse, ClienteService } from 'src/app/services/cliente/cliente.service';
import { CreateOrdenRequest, ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-venta-bebida-modal',
  templateUrl: './venta-bebida-modal.component.html',
  styleUrls: ['./venta-bebida-modal.component.scss']
})
export class VentaBebidaModalComponent implements OnInit {

  displayedColumns: string[] = ['bebida', 'precio', 'cantidad'];
  dataSource: ItemMenuResponse[] = [];
  searchTerm: string = '';
// Variable de clase para almacenar los IDs de grupo
grupoIds: number[] = [];

  public clientesPreferenciales: ClienteResponse[] = [];
  public clienteSeleccionado: ClienteResponse  | undefined;
  public empleadoNombre: string | null = null;
  public horaActual: string | undefined;
  //sirve para guardar los items seleccionados y la cantidad de cada uno
  public selectedItems: { [id: number]: number } = {};



  constructor(private menuService: MenuMozoService, private grupoService: GrupoComidaService, private clienteService: ClienteService, private ordenService: OrdenService, private toastService: ToastService, private dialogRef: MatDialogRef<VentaBebidaModalComponent>
    ) { }
  
  ngOnInit(): void {
    this.empleadoNombre = localStorage.getItem('empleadoNombre');
    this.cargarClientes();
    this.setHoraActual();
    this.loadMenuItems();
    this.cargarClientes();

}

setHoraActual(): void {
  const now = new Date();
  this.horaActual = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
}

increaseQuantity(itemId: number): void {
  if (this.selectedItems[itemId]) {
      this.selectedItems[itemId]++;
  } else {
      this.selectedItems[itemId] = 1;
  }
}

decreaseQuantity(itemId: number): void {
  if (this.selectedItems[itemId] && this.selectedItems[itemId] > 0) {
      this.selectedItems[itemId]--;
  }
}
getTotal(): number {
  let total = 0;
  for (const item of this.dataSource) {
      if (this.selectedItems[item.id]) {
          total += item.precio * this.selectedItems[item.id];
      }
  }
  return total;
}

prepareCreateOrdenRequest(): CreateOrdenRequest {
  const items: ItemsRequest[] = [];
  for (const item of this.dataSource) {
      if (this.selectedItems[item.id] && this.selectedItems[item.id] > 0) {
          items.push({
              itemMenuId: item.id,
              cantidad: this.selectedItems[item.id],
              precio: item.precio
          });
      }
  }

  const ahora = new Date();

  const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
  
  const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

  return {
      fecha,
      hora,
      responsable: "venta rapida",
      ocupacion: 0,
      observaciones: 'venta rapida',
      clienteId: this.clienteSeleccionado ? this.clienteSeleccionado.id : null,
      empleadoId: +localStorage.getItem('empleadoId')! ,
      items,
      mesas: [],
      estado: ESTADOS.ENTREGADA
  };
}

onConfirmar(): void {
  const request: CreateOrdenRequest = this.prepareCreateOrdenRequest();

  this.ordenService.create(request).subscribe({
    next: (response) => {
      this.toastService.showSuccess("Orden creada con éxito");
      this.dialogRef.close();

    },
    error: (error) => {
        console.error('Error al crear la orden', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    }
  });
}

cargarClientes(): void {
  this.clienteService.getAllClientesByLimit().subscribe({
    next: (response) => {
      this.clientesPreferenciales = response.items;
    },
    error: (error) => {
      console.error('Error al cargar los clientes:', error);
    }
  });
}



searchMenuItems(): void {
    this.menuService.getAll(1, 100, 'nombre', this.searchTerm, 'esBebida', true).subscribe(response => {
      this.dataSource = response.items;
    });
}

loadMenuItems(): void {
  this.menuService.getAll(1, 100, 'esBebida', true).subscribe(response => {
      this.dataSource = response.items;
  });
}

  
}
