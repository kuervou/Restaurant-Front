import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PagarTodoModalComponent } from '../pagar-todo-modal/pagar-todo-modal.component';
import { PagarParcialModalComponent } from '../pagar-parcial-modal/pagar-parcial-modal.component';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { Orden } from 'src/app/models/orden.model';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { PagarOrdenModalComponent } from '../pagar-orden-modal/pagar-orden-modal.component';
import { ConsultarOrdenCajaComponent } from '../consultar-orden-caja/consultar-orden-caja.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { ConfirmarEliminarOrdenCajaComponent } from '../confirmar-eliminar-orden-caja/confirmar-eliminar-orden-caja.component';

@Component({
  selector: 'app-ordenes-mesa-caja-modal',
  templateUrl: './ordenes-mesa-caja-modal.component.html',
  styleUrls: ['./ordenes-mesa-caja-modal.component.scss']
})
export class OrdenesMesaCajaModalComponent implements OnInit{
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  private mesaId: number;
  ESTADOS = ESTADOS; 

  ordenes: Orden[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private ordenService: OrdenService, private toastService: ToastService, private router: Router) { 
    this.socket = io(this.socketUrl);
    this.mesaId = data.mesa.id;
    console.log(data.mesa); // Aquí tendrás la información de la mesa
  }

  ngOnInit(): void {
    this.fetchOrdenesEnCaja();
    this.socket.on('fetchOrdenes', (data: any) => {
      this.fetchOrdenesEnCaja();
    });
  }

  fetchOrdenesEnCaja(): void {
    this.ordenService.getOrdenesCaja(this.mesaId).subscribe({
        next: (response: OrdenResponse) => {
            this.ordenes = response.items;
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
  }

  public getCardHeaderStyle(estado: string): object {
    switch (estado) {
        case ESTADOS.POR_CONFIRMAR:
            return { 'background-color': '#FE8C73', 'border': '1px solid #FCFF76' };
        case ESTADOS.EN_COCINA:
            return { 'background-color': '#FFD686' };
        case ESTADOS.PARA_ENTREGAR:
            return { 'background-color': '#E1F180' };
        case ESTADOS.ENTREGADA:
            return { 'background-color': '#C6F6D5' };    
        default:
            return {};
    }
}



cambiarEstado(ordenId: number, nuevoEstado: string): void {
  const datosActualizar = {
      estado: nuevoEstado
  };

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

cancelarOrden(ordenId: number): void {
  const dialogRef = this.dialog.open(ConfirmarEliminarOrdenCajaComponent, {
    width: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.procederCancelarOrden(ordenId);
    }
  });
}

procederCancelarOrden(ordenId: number): void {
  this.ordenService.deleteOrden(ordenId).subscribe({
      next: (response) => {
          console.log('Orden eliminada, respuesta:', response);
          this.toastService.showSuccess("Orden cancelada con exito");      },
      error: (error) => {
          console.error('Hubo un error al eliminar la orden:', error);
          // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
  });
}

getMesas(orden: Orden): string {
  return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
}

  openModalPagarTodo(): void {
    const dialogRef = this.dialog.open(PagarTodoModalComponent, {
      width: '30rem',
      data: { ... this.ordenes }
      
    });

}
openModalOrdenModal(orden: Orden): void {
  const dialogRef = this.dialog.open(PagarOrdenModalComponent, {
    width: '60rem',
    data: { orden: orden } 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado');
    // Aquí puedes manejar los resultados después de cerrar el modal
  });
}

openConsultarOrden(orden : Orden){
  const dialogRef = this.dialog.open(ConsultarOrdenCajaComponent, {
    width: '70rem',
    height: '50rem',
    data: {orden}  // Puedes pasar la data inicial aquí si es necesario.
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('El modal fue cerrado', result);
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}

close(){
  this.dialog.closeAll();
}

}
