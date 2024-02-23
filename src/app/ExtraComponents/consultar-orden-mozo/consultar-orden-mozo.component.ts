import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { itemSeleccionadoInterface } from 'src/app/components/menu-mozo/menu-mozo.component';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { CreateOrdenRequest, ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';

@Component({
  selector: 'app-consultar-orden-mozo',
  templateUrl: './consultar-orden-mozo.component.html',
  styleUrls: ['./consultar-orden-mozo.component.scss']
})
export class ConsultarOrdenMozoComponent {
  public observaciones: string = '';
  public items !: ItemsRequest[];

  constructor(
    public dialogRef: MatDialogRef<ConsultarOrdenMozoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordenService:OrdenService,
    private router: Router
    ) { 
      if (data.observaciones) {
        this.observaciones = data.observaciones;
      }
    }

    get observacionesSeparadas(): string[] {
      return this.observaciones.split(' & ');
    }

    calcularTotal(): number {
      return this.data.items.reduce((acumulado : number, item : ItemsRequest) => acumulado + (item.cantidad * item.precio), 0);
    }

    onCancel(){
      this.dialogRef.close();
    }
}
