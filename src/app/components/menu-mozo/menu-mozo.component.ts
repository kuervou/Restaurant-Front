import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AgregarObservacionOrdenModalComponent } from 'src/app/ExtraComponents/agregar-observacion-orden-modal/agregar-observacion-orden-modal/agregar-observacion-orden-modal.component';
import { ResumenOrdenModalComponent } from 'src/app/ExtraComponents/resumen-orden-modal/resumen-orden-modal.component';
import { Grupo } from 'src/app/models/grupo.model';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { DataTransferService } from 'src/app/services/DataTransferService/data-transfer-service.service';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import {  MenuMozoService, ItemMenuResponse } from 'src/app/services/menumozo/menu-mozo.service';

export interface itemSeleccionadoInterface{
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  grupo: Grupo;
  cantidad: Number;
}

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss']
})
export class MenuMozoComponent {
  private destroy$ = new Subject<void>();
  public grupos: Grupo[] =  [];
  public itemsPorGrupo: { [grupoId: number]: ItemMenuResponse[] } = {};
  public ordenData: any;
  public cantidades: { [itemId: number]: number } = {};
  public observaciones: string = "";

  constructor(
    public dialog: MatDialog,
    private dataTransferService: DataTransferService, // Inyectar el servicio
    private grupoComidaService: GrupoComidaService,
    private menuMozoService: MenuMozoService
  ) {
    // Subscribirse al servicio para recibir los datos
    this.dataTransferService.ordenData$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if (data) {
        console.log('Datos recibidos:', data);
        this.ordenData = data;
        // Aquí puedes manejar y usar los datos recibidos
      }
    });

    this.getAllGrupos();


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(): void {
    const itemsSeleccionados: itemSeleccionadoInterface[] = [];
    for (const key in this.itemsPorGrupo) {
      this.itemsPorGrupo[key].forEach(item => {
        if (this.cantidades[item.id] && this.cantidades[item.id] > 0) {
          itemsSeleccionados.push({
            ...item,
            cantidad: this.cantidades[item.id]
          });
        }
      });
    }
  
    const data = {
      items: itemsSeleccionados,
      ordenData: this.ordenData,
      observaciones: this.observaciones // Incluir las observaciones aquí
    };
  
    console.log(data);
  
    const dialogRef = this.dialog.open(ResumenOrdenModalComponent, {
      width: '30rem',
      data: data  // Pasamos la data al modal, incluyendo las observaciones.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal.
      // Si necesitas actualizar algo en este componente basado en la interacción con el modal, hazlo aquí.
    });
  }  

  agregarObservacion(item: any) {
    const dialogRef = this.dialog.open(AgregarObservacionOrdenModalComponent, {
      width: '30rem',
      data: {
        item: item, // El ítem al que se refiere la observación
        comentario: '' // Inicializa el comentario como un string vacío
      }
    });

    dialogRef.afterClosed().subscribe(observacionFormateada => {
      if (observacionFormateada) {
        // Si ya existen observaciones, concatena con "&", de lo contrario, inicia la cadena
        this.observaciones = this.observaciones ?
          `${this.observaciones} & ${observacionFormateada}` :
          observacionFormateada;
        console.log('Observaciones actualizadas:', this.observaciones);
      }
    });
  }

  aumentarCantidad(item: any) {
    if (!this.cantidades[item.id]) {
        this.cantidades[item.id] = 0;
    }
    this.cantidades[item.id]++;
}

disminuirCantidad(item: any) {
    if (this.cantidades[item.id] && this.cantidades[item.id] > 0) {
        this.cantidades[item.id]--;
    }
}


  //función para obtener todos los grupos de comidas del sistema
  getAllGrupos() {
    this.grupoComidaService.getAll().subscribe({
        next: (response) => {
            this.grupos = response.items;
            this.grupos.forEach(grupo => {
                this.menuMozoService.getAll(-1, 100, 'grupoId', grupo.id).subscribe({
                    next: (itemsResponse) => {
                        this.itemsPorGrupo[grupo.id] = itemsResponse.items;
                    },
                    error: (error) => {
                        console.log('Error al obtener items por grupo', error);
                    }
                });
            });
        },
        error: (error) => {
            console.log(error);
        }
    });
}



}