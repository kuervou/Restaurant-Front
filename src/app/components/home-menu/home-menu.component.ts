import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarOrdenMenuComponent } from 'src/app/ExtraComponents/confirmar-orden-menu/confirmar-orden-menu.component';
import { EstadoCompartidoService } from 'src/app/services/estadocompartido/estado-compartido.service';
import { GrupoComidaService, GrupoResponse } from 'src/app/services/grupoComida/grupo-comida.service';
import { ResumenOrdenMenuComponent } from '../resumen-orden-menu/resumen-orden-menu.component';

export interface itemSeleccionado{
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  @ViewChild('comidasPanel') comidasPanel!: MatExpansionPanel;
  @ViewChild('bebidasPanel') bebidasPanel!: MatExpansionPanel;

  itemsMenu: itemSeleccionado[] = [];
  observaciones: string = "";
  comidas: GrupoResponse[] = [];
  bebidas: GrupoResponse[] = [];
  totalOrden: number = 0;

  constructor( 
    public dialog: MatDialog,
    private grupoComidaService: GrupoComidaService,
    private router: Router,
    private estadoCompartidoService: EstadoCompartidoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarGrupos();
  
    // Obtén los datos del servicio
    this.itemsMenu = this.estadoCompartidoService.itemsMenu;
    this.observaciones = this.estadoCompartidoService.observaciones;
  
    // Calcula el total de la orden
    this.calcularTotalOrden();

    this.route.paramMap.subscribe(params => {
      const numeroMesa = params.get('mesa');
      if (numeroMesa !== null) {
        // Si hay un número de mesa, guárdalo en localStorage
        localStorage.setItem('numeroMesa', numeroMesa);
      } else {
        // Si no hay número de mesa, decide qué hacer. Por ejemplo, usar un valor predeterminado o manejar la ausencia del número de mesa.
        console.warn('Número de mesa no proporcionado en la URL');
        // Aquí podrías establecer un valor predeterminado o simplemente no establecer nada en localStorage
      }
    });
  }

  calcularTotalOrden() {
    this.totalOrden = this.itemsMenu.reduce((acumulado, item) => {
      return acumulado + (item.precio * item.cantidad);
    }, 0);
  }

  cargarGrupos() {
    this.grupoComidaService.getAll().subscribe(response => {
      this.comidas = response.items.filter(grupo => !grupo.esBebida);
      this.bebidas = response.items.filter(grupo => grupo.esBebida);
    });
  }

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
  }

  verDetallesGrupo(id: number) {
    this.router.navigate(['/grupomenu', id], {
      state: { itemMenu: this.itemsMenu, observaciones: this.observaciones } // Pasando itemMenu al estado de navegación
    });
  }

  openResumenOrdenDialog() {
    const dialogRef = this.dialog.open(ResumenOrdenMenuComponent, {
      width: '80%',
      data: {
        itemsMenu: this.itemsMenu,
        observaciones: this.observaciones,
        totalOrden: this.totalOrden
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo ConfirmarOrdenMenuComponent fue cerrado', result);
      // Aquí puedes hacer algo con el resultado si es necesario.
    });
  }

}
