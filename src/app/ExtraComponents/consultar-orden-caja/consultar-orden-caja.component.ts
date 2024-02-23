import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { PagosOrdenCajaModalComponent } from '../pagos-orden-caja-modal/pagos-orden-caja-modal.component';
import { OrdenService, estadoPagosResponse } from 'src/app/services/orden/orden.service';
import { EmpleadoResponse, EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { EliminarItemOrdenComponent } from '../eliminar-item-orden/eliminar-item-orden.component';
import { environment } from 'src/environments/environments';
import { Socket, io } from 'socket.io-client';

@Component({
  selector: 'app-consultar-orden-caja',
  templateUrl: './consultar-orden-caja.component.html',
  styleUrls: ['./consultar-orden-caja.component.scss']
})
export class ConsultarOrdenCajaComponent {
  estadoPagos!: estadoPagosResponse;
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  observacionesArray: string[] = [];

  constructor(public dialogRef: MatDialogRef<ConsultarOrdenCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    private ordenService: OrdenService
    ) {
      this.socket = io(this.socketUrl);
    }

    ngOnInit() {
      this.cargarEstadosPagos(this.data.orden.id);
      this.socket.on('fetchOrdenes', (data: any) => {
        this.cargarEstadosPagos(this.data.orden.id);
      });
      this.procesarObservaciones();
    }

    procesarObservaciones() {
      // Suponiendo que las observaciones vienen en un formato como "clave:valor & clave2:valor2"
      // primero verifica que existan observaciones para evitar errores
      if (this.data.orden.observaciones) {
        // Separa las observaciones por el símbolo `&` y las almacena en el arreglo
        this.observacionesArray = this.data.orden.observaciones.split(' & ');
      }
    }

    cargarEstadosPagos(idOrden: number) {
      this.ordenService.getEstadosPagos(idOrden).subscribe({
        next: (response) => {
          // Guarda la respuesta completa en la variable del componente
          this.estadoPagos = response
          console.log(this.estadoPagos);
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          // Manejo de errores
        }
      });
    }

    abrirModalPagos() {
      this.dialog.open(PagosOrdenCajaModalComponent, {
        width: '30rem', // o el ancho que desees
        height: '30rem',
        // Puedes pasar datos al modal si es necesario
        data: { estadoPagos: this.estadoPagos }
      });
    }

    abrirModalEliminarItem(item: any) {
      const dialogRef = this.dialog.open(EliminarItemOrdenComponent, {
        width: '250px',
        data: { item: item }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Este bloque de código se ejecutará después de cerrar el modal
        if (result) {
          // Actualiza los datos si el modal se cerró con alguna acción relevante
          this.dialogRef.close();
        }
      });
      
    }
    
}
