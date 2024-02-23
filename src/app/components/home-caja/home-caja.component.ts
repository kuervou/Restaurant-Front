import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { MesasOcupadasResponse, MesasResponse, MesasService } from 'src/app/services/mesas/mesas.service';
import { AgregarOrdenModalComponent } from 'src/app/ExtraComponents/agregar-orden-modal/agregar-orden-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { VentaBebidaModalComponent } from 'src/app/ExtraComponents/venta-bebida-modal/venta-bebida-modal.component';

import { OrdenesMesaCajaModalComponent } from 'src/app/ExtraComponents/ordenes-mesa-caja-modal/ordenes-mesa-caja-modal.component';
import { PagarOrdenModalComponent } from 'src/app/ExtraComponents/pagar-orden-modal/pagar-orden-modal.component';

import { AbrirBotellaModalComponent } from 'src/app/ExtraComponents/abrir-botella-modal/abrir-botella-modal.component';
import { AccionesBotellasModalComponent } from 'src/app/ExtraComponents/acciones-botellas-modal/acciones-botellas-modal.component';
import { HistorialOrdenesModalComponent } from 'src/app/ExtraComponents/historial-ordenes-modal/historial-ordenes-modal.component';
import { ToastService } from 'src/app/services/toast/toast.service';

import { ConsultarOrdenCajaComponent } from 'src/app/ExtraComponents/consultar-orden-caja/consultar-orden-caja.component';
import { ModificarOrdenModalComponent } from 'src/app/ExtraComponents/modificar-orden-modal/modificar-orden-modal/modificar-orden-modal.component';
import { ConfirmarEliminarOrdenCajaComponent } from 'src/app/ExtraComponents/confirmar-eliminar-orden-caja/confirmar-eliminar-orden-caja.component';


@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.scss']
})
export class HomeCajaComponent  implements OnInit{
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  mesasOcupadas: MesasResponse[] = [];
  ESTADOS = ESTADOS; 
  public pagosOrdenMap = new Map<number, number>(); // Mapa para guardar el total pagado por orden


  ordenes: Orden[] = [];

  constructor(private ordenService: OrdenService, private mesasService: MesasService, private toastService: ToastService, public dialog: MatDialog) {
  this.socket = io(this.socketUrl);
  }  



  ngOnInit(): void {
    this.fetchOrdenesEnCaja();
    this.getOcupadas();

    this.socket.on('fetchOrdenes', (data: any) => {
      this.fetchOrdenesEnCaja();
      this.getOcupadas();
    });
  }

  getMesas(orden: Orden): string {
    return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
  }


  getOcupadas(): void {
    this.mesasService.getOcupadas().subscribe({
        next: (response: MesasOcupadasResponse) => {
            this.mesasOcupadas = response.mesas;
            console.log(this.mesasOcupadas);
        },
        error: (error) => {
            console.error('Hubo un error al obtener las mesas', error);
        }
    });
     
  }

  openModalConMesa(mesa: MesasResponse): void {  // Asegúrate de usar el tipo correcto en lugar de 'any' si tienes un modelo definido para 'mesa'
    const dialogRef = this.dialog.open(OrdenesMesaCajaModalComponent, {
      width: '80%',
      data: { mesa: mesa }  // Pasando la data aquí
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar los resultados después de que se cierre el modal
    });
  }

  openModalOrdenModal(orden: Orden): void {
    const dialogRef = this.dialog.open(PagarOrdenModalComponent, {
      width: '60rem',
      data: { orden: orden } 
    });
  }

  openModificarOrdenModal(orden: Orden){
    const dialogRef = this.dialog.open(ModificarOrdenModalComponent, {
      width: '45rem',
      data: { orden } 
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



  fetchOrdenesEnCaja(): void {
    this.ordenService.getOrdenesCaja().subscribe({
        next: (response: OrdenResponse) => {
            this.ordenes = response.items;
            // Para cada orden, obtener el total pagado y actualizar el mapa
            this.ordenes.forEach((orden) => {
              this.actualizarPagosOrden(orden.id);
            });
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
  }

  actualizarPagosOrden(ordenId: number): void {
    this.ordenService.getEstadosPagos(ordenId).subscribe({
      next: (estadoPagosResponse) => {
        this.pagosOrdenMap.set(ordenId, estadoPagosResponse.totalPagado);
      },
      error: (error) => {
        console.error('Hubo un error al obtener los pagos', error);
    }
    });
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

private procederCancelarOrden(ordenId: number) {
  this.ordenService.deleteOrden(ordenId).subscribe({
    next: (response) => {
      console.log('Orden eliminada, respuesta:', response);
      this.toastService.showSuccess("Orden cancelada con éxito");
      // Actualizar la lista de órdenes aquí si es necesario
    },
    error: (error) => {
      console.error('Hubo un error al eliminar la orden:', error);
      // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
    }
  });
}



openVentaBebidasDialog(): void {
  const dialogRef = this.dialog.open(VentaBebidaModalComponent, {
    width: '100rem',
    data: {}  // Puedes pasar la data inicial aquí si es necesario.
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('El modal fue cerrado', result);
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}
 
openAgregarDialog(): void {
  const dialogRef = this.dialog.open(AgregarOrdenModalComponent, {
    width: '30rem',
    data: {}  // Puedes pasar la data inicial aquí si es necesario.
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('El modal fue cerrado', result);
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}

openAbrirBotellasModal(){
  const dialogRef = this.dialog.open(AccionesBotellasModalComponent, {
    width: '70rem',
    height: '50rem',
    data: {}  // Puedes pasar la data inicial aquí si es necesario.
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('El modal fue cerrado', result);
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}


openHistorialOrdenes(){
  const dialogRef = this.dialog.open(HistorialOrdenesModalComponent, {
    width: '80%',
    height: '50rem',
    data: {}  // Puedes pasar la data inicial aquí si es necesario.
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

}