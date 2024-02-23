import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { OrdenResponse, OrdenService, UpdateOrdenRequest } from 'src/app/services/orden/orden.service';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { EXCLUDED_GROUPS } from 'src/app/constants/groups.constants'
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
@Component({
  selector: 'app-home-cocina',
  templateUrl: './home-cocina.component.html',
  styleUrls: ['./home-cocina.component.scss']
})
export class HomeCocinaComponent implements OnInit {
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  ordenes: Orden[] = [];
  filteredItemsMap: { [orderId: number]: any[] } = {};

  constructor(private ordenService: OrdenService, private backOfficeService: MenubackofficeService) { 
    this.socket = io(this.socketUrl);

  }

  ngOnInit(): void {
    this.fetchOrdenesEnCocina();

    this.socket.on('fetchOrdenes', (data: any) => {
      this.fetchOrdenesEnCocina();
    });
  }

  getMesas(orden: Orden): string {
    return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
  }
  

  fetchOrdenesEnCocina(): void {
    this.ordenService.getAll(1, 20, undefined, undefined, ESTADOS.EN_COCINA).subscribe({
        next: (response: OrdenResponse) => {

            // Primero, filtra los ítems de cada orden
            console.log(response.items);
            this.ordenes = response.items.map(orden => {
                const filteredItems = orden.items.filter(item => item.itemMenu.grupo.esBebida == false);
                return { ...orden, items: filteredItems };
            });
            // Luego, filtra las órdenes que se quedaron sin ítems
            this.ordenes = this.ordenes.filter(orden => orden.items.length > 0);

            // Construye el mapa de ítems filtrados
            this.filteredItemsMap = {};
            this.ordenes.forEach(orden => {
                this.filteredItemsMap[orden.id] = orden.items;
            });

            console.log(this.filteredItemsMap);
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
}


  prepararOrden(ordenId: number): void {
    // Preparamos los datos que queremos actualizar
    const datosActualizar: UpdateOrdenRequest = {
      estado: ESTADOS.PARA_ENTREGAR, // Aquí estamos actualizando el estado de la orden
    };

    // Llamamos al método de actualización del servicio y nos suscribimos al Observable
    this.ordenService.updateOrden(ordenId, datosActualizar).subscribe({
      next: (response) => {
        console.log('Orden actualizada, respuesta:', response);
        // Aquí podrías también manejar cualquier lógica post-actualización como alertas de éxito o refrescar la lista de órdenes
      },
      error: (error) => {
        console.error('Hubo un error al actualizar la orden:', error);
        // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
    });
  }


}
