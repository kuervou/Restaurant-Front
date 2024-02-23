import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { MatExpansionPanel } from '@angular/material/expansion';
import { ItemMenuResponse, MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { SeleccionarItemMenuComponent } from 'src/app/ExtraComponents/seleccionar-item-menu/seleccionar-item-menu.component';
import { itemSeleccionado } from '../home-menu/home-menu.component';
import { EstadoCompartidoService } from 'src/app/services/estadocompartido/estado-compartido.service';
import { ResumenOrdenMenuComponent } from '../resumen-orden-menu/resumen-orden-menu.component';
import { Grupo } from 'src/app/models/grupo.model';
import { CreateGrupoResponse, GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';

@Component({
  selector: 'app-grupo-menu',
  templateUrl: './grupo-menu.component.html',
  styleUrls: ['./grupo-menu.component.scss']
})
export class GrupoMenuComponent implements OnInit {
  @ViewChild('grupoPanel') grupoPanel!: MatExpansionPanel;
  grupoId!: number; // Aquí almacenaremos el ID del grupo
  itemsDelGrupo: ItemMenuResponse[] = []; // Para almacenar los items del grupo
  itemsMenu: itemSeleccionado[];
  observaciones : string;
  totalOrden: number = 0;
  grupo!: Grupo;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private menubackofficeService: MenubackofficeService, // Inyecta tu servicio
    private router: Router,
    private estadoCompartidoService: EstadoCompartidoService,
    private grupoComidaService: GrupoComidaService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      this.itemsMenu = navigation.extras.state['itemMenu'] ? navigation.extras.state['itemMenu'] : [];
      // Asigna una cadena vacía si 'observaciones' no está presente
      this.observaciones = navigation.extras.state['observaciones'] ? navigation.extras.state['observaciones'] : "";
    } else {
      // Si 'navigation' no está definido o no tiene un estado, inicializa tus variables a sus valores predeterminados
      this.itemsMenu = [];
      this.observaciones = "";
    }
  }

  ngOnInit() {
    // Obtén el ID del grupo de los parámetros de la ruta de forma segura
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.grupoId = parseInt(routeId, 10);
      this.cargarItemsDelGrupo();
    } else {
      // Manejo del caso en el que 'id' no está presente en la ruta
      console.error('No se encontró el ID del grupo en la ruta');
      // Aquí podrías redirigir al usuario a una ruta de error o manejar este caso como consideres necesario
    }
    // Calcula el total de la orden
    this.calcularTotalOrden();
    this.getGrupo();
  }

  calcularTotalOrden() {
    this.totalOrden = this.itemsMenu.reduce((acumulado, item) => {
      return acumulado + (item.precio * item.cantidad);
    }, 0);
  }

  getGrupo() {
  if (this.grupoId) {
    this.grupoComidaService.getGrupoById(this.grupoId).subscribe({
      next: (grupo) => {
        this.grupo = grupo;
        // Cualquier otra lógica que dependa de `this.grupo` debería ir aquí
      },
      error: (error) => {
        console.error('Error al obtener el grupo', error);
      }
    });
  }
}


  cargarItemsDelGrupo() {
    // Llama al servicio con el grupoId obtenido de la ruta
    this.menubackofficeService.getAll(1, 10, 'grupoId', this.grupoId).subscribe({
      next: (response) => {
        this.itemsDelGrupo = response.items;
      },
      error: (error) => {
        console.error('Ocurrió un error al obtener los items del grupo', error);
      }
    });
  }

  openModal(item: ItemMenuResponse) {
    const dialogRef = this.dialog.open(SeleccionarItemMenuComponent, {
      width: '80%',
      autoFocus: false,
      data: {
        item: item,
        itemsMenu: this.itemsMenu,
        observaciones: this.observaciones
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza los datos de itemsMenu y observaciones con los valores devueltos por el modal
        this.itemsMenu = result.itemsMenu;
        this.observaciones = result.observaciones;
      }
      // Calcula el total de la orden
      this.calcularTotalOrden();
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

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
  }

  navigateToHome() {
    // Actualiza el servicio con los datos más recientes antes de navegar
    this.estadoCompartidoService.actualizarItemsMenu(this.itemsMenu);
    this.estadoCompartidoService.actualizarObservaciones(this.observaciones);
  
    // Navega hacia atrás sin necesidad de pasar estado
    this.router.navigate(['/homemenu']);
  }

}
