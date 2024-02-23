import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  MesasOcupadasResponse,
  MesasService,
} from 'src/app/services/mesas/mesas.service';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { environment } from 'src/environments/environments';
import { DisponibilidadMesasModalComponent } from '../disponibilidad-mesas-modal/disponibilidad-mesas-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RetirarEfectivoModalComponent } from '../retirar-efectivo-modal/retirar-efectivo-modal.component';
import { IngresarEfectivoModalComponent } from '../ingresar-efectivo-modal/ingresar-efectivo-modal.component';
import { CajaResponse, CajaService } from 'src/app/services/caja/caja.service';
import { HistorialCajaComponent } from '../historial-caja/historial-caja.component';

@Component({
  selector: 'app-footer-caja',
  templateUrl: './footer-caja.component.html',
  styleUrls: ['./footer-caja.component.scss'],
})
export class FooterCajaComponent implements OnInit {
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  totalCount: number = 0;
  libreCount: number = 0;
  ocupadasCount: number = 0;
  ocupacionLocal: number = 0;
  cajaTotal: number = 0;

  constructor(public dialog: MatDialog, private mesasService: MesasService, private ordenService: OrdenService, private cajaService: CajaService) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit(): void {
    this.getOcupadas();
    this.getOcupacion();
    this.getTotalCaja();

    this.socket.on('fetchOrdenes', (data: any) => {
      this.getOcupadas();
      this.getOcupacion();
      this.getTotalCaja();
    });

    this.socket.on('fetchTotalCaja', (data: any) => {
      this.getTotalCaja();
    });
  }



  getOcupadas(): void {
    this.mesasService.getOcupadas().subscribe({
      next: (response: MesasOcupadasResponse) => {
        this.totalCount = response.totalCount;
        this.libreCount = response.libreCount;
        this.ocupadasCount = response.ocupadasCount;
      },
      error: (error) => {
        console.error('Hubo un error al obtener las mesas', error);
      },
    });
  }

  getOcupacion(): void {
    this.ordenService.getOcupacion().subscribe({
      next: (response: number) => {
        this.ocupacionLocal = response;
        console.log(this.ocupacionLocal);
      },
      error: (error) => {
        console.error('Hubo un error al obtener la ocupación', error);
      },
    });
  }

  getTotalCaja(): void {
    this.cajaService.getCajaTotal(1).subscribe({
      next: (response: CajaResponse) => {
        this.cajaTotal = response.total;
        console.log(this.cajaTotal);
      },
    error: (error) => {
    console.error('Error obteniendo el total de la caja:', error);
    },
   });
  }
  
  openDisponibilidadModal(): void {
    const dialogRef = this.dialog.open(DisponibilidadMesasModalComponent, {
      width: '30rem',
    });

}
openRetiroModal(): void {
  const dialogRef = this.dialog.open(RetirarEfectivoModalComponent, {
    width: '30rem',
  });

}
openIngresoModal(): void {
  const dialogRef = this.dialog.open(IngresarEfectivoModalComponent, {
    width: '30rem',
  });

}

openHistorialModal(): void {
  const dialogRef = this.dialog.open(HistorialCajaComponent, {
    width: '70rem',
    height: '50rem'
  });

}

}
