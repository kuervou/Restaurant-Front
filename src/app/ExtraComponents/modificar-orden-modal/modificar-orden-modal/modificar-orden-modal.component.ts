import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { Orden } from 'src/app/models/orden.model';
import { DataTransferService } from 'src/app/services/DataTransferService/data-transfer-service.service';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ItemMenuResponse, MenuMozoService } from 'src/app/services/menumozo/menu-mozo.service';
import { AgregarObservacionOrdenModalComponent } from '../../agregar-observacion-orden-modal/agregar-observacion-orden-modal/agregar-observacion-orden-modal.component';
import { ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';
import { ConfirmarModificarOrdenComponent } from '../../confirmar-modificar-orden/confirmar-modificar-orden.component';

interface ItemOrden {
  itemMenuId: number;
  cantidad: number;
  // Añade aquí otros campos que esperas que tenga cada ítem de la orden.
}

@Component({
  selector: 'app-modificar-orden-modal',
  templateUrl: './modificar-orden-modal.component.html',
  styleUrls: ['./modificar-orden-modal.component.scss']
})

export class ModificarOrdenModalComponent {
  public grupos: Grupo[] =  [];
  public itemsPorGrupo: { [grupoId: number]: ItemMenuResponse[] } = {};
  public ordenData: any;
  public cantidades: { [itemId: number]: number } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModificarOrdenModalComponent>,
    public dialog: MatDialog,
    private dataTransferService: DataTransferService, // Inyectar el servicio
    private grupoComidaService: GrupoComidaService,
    private menuMozoService: MenuMozoService,
    private ordenService: OrdenService
  ) {}

    ngOnInit(): void {
      this.getAllGrupos();
    }

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
    
    agregarObservacion(item: any) {
      const dialogRef = this.dialog.open(AgregarObservacionOrdenModalComponent, {
        width: '30rem',
        data: {
          item: item, // El ítem al que se refiere la observación
          comentario: '' // Inicializa el comentario como un string vacío
        }
      });
  
      dialogRef.afterClosed().subscribe(observacionFormateada => {
        this.dialogRef.close();
      });
    }

    finalizarOrden() {
      const dialogRef = this.dialog.open(ConfirmarModificarOrdenComponent, {
        width: '250px'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.modificarOrden();
        }
      });
    }
    
    private modificarOrden() {
      const itemsParaAgregar: ItemsRequest[] = this.construirItemsParaAgregar();
      const requestPayload = {
        items: itemsParaAgregar
      };
    
      this.ordenService.addItem(this.data.orden.id, requestPayload).subscribe({
        next: (response) => {
          console.log('Items agregados con éxito', response);
          this.dialogRef.close(); // Cierra el diálogo tras una respuesta exitosa
        },
        error: (error) => {
          console.log('Error al agregar items', error);
          // Manejo de errores
        }
      });
    }

  
    private construirItemsParaAgregar(): ItemsRequest[] {
      let items: ItemsRequest[] = [];
      
      for (const grupoId in this.itemsPorGrupo) {
        if (this.itemsPorGrupo.hasOwnProperty(grupoId)) {
          this.itemsPorGrupo[grupoId].forEach(item => {
            const cantidad = this.cantidades[item.id];
            if (cantidad && cantidad > 0) {
              items.push({
                itemMenuId: item.id,
                cantidad: cantidad,
                precio: item.precio // Asegúrate de tener el precio en el modelo ItemMenuResponse
              });
            }
          });
        }
      }
      
      return items;
    }

}
