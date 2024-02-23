import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-mesas-prototype',
  templateUrl: './mesas-prototype.component.html',
  styleUrls: ['./mesas-prototype.component.scss']
})
export class MesasPrototypeComponent implements OnInit {

  private socketUrl = environment.socketUrl;
  private socket: Socket;
  mesas: any[] = [];
  

  constructor(private mesaService: MesaService) { 
    this.socket = io(this.socketUrl); // Asegúrate de que esta URL sea la de tu servidor
  }

  ngOnInit(): void {
    this.fetchMesas();

    // Escuchamos cualquier actualización de mesa en tiempo real
      this.socket.on('mesaUpdate', (data: any) => {
      // Aquí puedes actualizar tu estado local, en este caso refrescamos las mesas
      this.fetchMesas();
    });
  }

  cambiarEstadoMesa(id: string, estaLibre: boolean, numeroDeMesa: string): void {
    this.mesaService.actualizarEstadoMesa(id, !estaLibre, numeroDeMesa).subscribe(
      response => {
        // Actualizar la lista de mesas
        // (Esto puede ser redundante si el servidor ya está enviando un evento de actualización)
        this.fetchMesas();
      },
      error => {
        // Manejar el error aquí
        console.error('Error actualizando la mesa:', error);
      }
    );
  }

  fetchMesas(): void {
    this.mesaService.obtenerMesas().subscribe(data => {
      this.mesas = data;
    });
  }
}