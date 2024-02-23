import { NgModule, ViewChild, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './middlewares/auth.interceptor';
import { ErrorInterceptor } from './middlewares/error.interceptor';

import { MatCardModule } from '@angular/material/card'; // Importa el módulo de MatCard
import { MatButtonModule } from '@angular/material/button'; // Importa el módulo de MatButtonModule
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule desde Angular Material
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips'; // Para los chips
import { MatExpansionModule} from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';


import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { CurrentTimeComponent } from './ExtraComponents/current-time/current-time.component';
import { FooterCajaComponent } from './ExtraComponents/footer-caja/footer-caja.component';
import { HeaderComponent } from './ExtraComponents/header/header.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { AgregarItemModalComponent } from './ExtraComponents/agregar-item-modal/agregar-item-modal.component';
import { ModificarItemModalComponent } from './ExtraComponents/modificar-item-modal/modificar-item-modal.component';
import { EliminarItemModalComponent } from './ExtraComponents/eliminar-item-modal/eliminar-item-modal.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MesasPrototypeComponent } from './components/mesas-prototype/mesas-prototype.component';
import { AgregarStockModalComponent } from './ExtraComponents/agregar-stock-modal/agregar-stock-modal.component';
import { QuitarStockModalComponent } from './ExtraComponents/quitar-stock-modal/quitar-stock-modal.component';
import { BackOfficeMenuComponent } from './components/back-office-menu/back-office-menu.component';
import { AgregarItemMenuModalComponent } from './ExtraComponents/agregar-item-menu-modal/agregar-item-menu-modal.component';
import { ConsultarItemMenuModalComponent } from './ExtraComponents/consultar-item-menu-modal/consultar-item-menu-modal.component';
import { ModificarItemMenuModalComponent } from './ExtraComponents/modficar-item-menu-modal/modficar-item-menu-modal.component';
import { ConfirmarAccionModalComponent } from './ExtraComponents/confirmar-accion-modal/confirmar-accion-modal.component';
import { EliminarItemMenuModalComponent } from './ExtraComponents/eliminar-item-menu-modal/eliminar-item-menu-modal.component';
import { HomeMozoComponent } from './components/home-mozo/home-mozo.component';
import { MenuMozoComponent } from './components/menu-mozo/menu-mozo.component';
import { OrdenesMesaComponent } from './components/ordenes-mesa/ordenes-mesa.component';
import { AgregarOrdenModalComponent } from './ExtraComponents/agregar-orden-modal/agregar-orden-modal.component';
import { EditarOrdenModalComponent } from './ExtraComponents/editar-orden-modal/editar-orden-modal.component';
import { LiberarMesaModalComponent } from './ExtraComponents/liberar-mesa-modal/liberar-mesa-modal.component';
import { ResumenOrdenModalComponent } from './ExtraComponents/resumen-orden-modal/resumen-orden-modal.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { InfoOrdenModalComponent } from './ExtraComponents/info-orden-modal/info-orden-modal.component';
import { AgregarEmpleadoModalComponent } from './ExtraComponents/agregar-empleado-modal/agregar-empleado-modal.component';
import { EditarEmpleadoModalComponent } from './ExtraComponents/editar-empleado-modal/editar-empleado-modal.component';
import { EliminarEmpleadoModalComponent } from './ExtraComponents/eliminar-empleado-modal/eliminar-empleado-modal.component';
import { AgregarClienteModalComponent } from './ExtraComponents/agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from './ExtraComponents/editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from './ExtraComponents/eliminar-cliente-modal/eliminar-cliente-modal.component';
import { MovimientosCajaModalComponent } from './ExtraComponents/movimientos-caja-modal/movimientos-caja-modal.component';
import { OrdenesMesaCajaModalComponent } from './ExtraComponents/ordenes-mesa-caja-modal/ordenes-mesa-caja-modal.component';
import { PagarTodoModalComponent } from './ExtraComponents/pagar-todo-modal/pagar-todo-modal.component';
import { PagarParcialModalComponent } from './ExtraComponents/pagar-parcial-modal/pagar-parcial-modal.component';
import { AccionesBotellasModalComponent } from './ExtraComponents/acciones-botellas-modal/acciones-botellas-modal.component';
import { AbrirBotellaModalComponent } from './ExtraComponents/abrir-botella-modal/abrir-botella-modal.component';
import { DescontarBotellaModalComponent } from './ExtraComponents/descontar-botella-modal/descontar-botella-modal.component';
import { DisponibilidadMesasModalComponent } from './ExtraComponents/disponibilidad-mesas-modal/disponibilidad-mesas-modal.component';
import { RetirarEfectivoModalComponent } from './ExtraComponents/retirar-efectivo-modal/retirar-efectivo-modal.component';
import { IngresarEfectivoModalComponent } from './ExtraComponents/ingresar-efectivo-modal/ingresar-efectivo-modal.component';
import { VentaBebidaModalComponent } from './ExtraComponents/venta-bebida-modal/venta-bebida-modal.component';

import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { SeleccionarItemMenuComponent } from './ExtraComponents/seleccionar-item-menu/seleccionar-item-menu.component';
import { GrupoMenuComponent } from './components/grupo-menu/grupo-menu.component';
import { ResumenOrdenMenuComponent } from './components/resumen-orden-menu/resumen-orden-menu.component';
import { ConfirmarOrdenMenuComponent } from './ExtraComponents/confirmar-orden-menu/confirmar-orden-menu.component';
import { ExitoOrdenMenuComponent } from './ExtraComponents/exito-orden-menu/exito-orden-menu.component';
import { HomeEstadisticasComponent } from './components/home-estadisticas/home-estadisticas.component';
import { EstadisticasGeneralesComponent } from './components/estadisticas-generales/estadisticas-generales.component';
import { EstadisticasClientesComponent } from './components/estadisticas-clientes/estadisticas-clientes.component';
import { EstadisticasVentasComponent } from './components/estadisticas-ventas/estadisticas-ventas.component';

import { CategoriasComponent } from './components/categorias/categorias/categorias.component';
import { AgregarCategoriaModalComponent } from './ExtraComponents/agregar-categoria-modal/agregar-categoria-modal/agregar-categoria-modal.component';
import { ModificarCategoriaModalComponent } from './ExtraComponents/modificar-categoria-modal/modificar-categoria-modal/modificar-categoria-modal.component';
import { EliminarCategoriaModalComponent } from './ExtraComponents/eliminar-categoria-modal/eliminar-categoria-modal/eliminar-categoria-modal.component';
import { GruposComponent } from './components/grupos/grupos/grupos.component';
import { AgregarGrupoModalComponent } from './ExtraComponents/agregar-grupo-modal/agregar-grupo-modal/agregar-grupo-modal.component';
import { ModificarGrupoModalComponent } from './ExtraComponents/modificar-grupo-modal/modificar-grupo-modal/modificar-grupo-modal.component';
import { EliminarGrupoModalComponent } from './ExtraComponents/eliminar-grupo-modal/eliminar-grupo-modal/eliminar-grupo-modal.component';

import { PagarOrdenModalComponent } from './ExtraComponents/pagar-orden-modal/pagar-orden-modal.component';

import { ActivarItemMenuModalComponent } from './ExtraComponents/activar-item-menu-modal/activar-item-menu-modal/activar-item-menu-modal.component';




import { NgChartsModule } from 'ng2-charts';
import { EstadisticasBarraComponent } from './components/estadisticas-barra/estadisticas-barra.component';
import { InfoUsuarioComponent } from './components/info-usuario/info-usuario.component';
import { ResetPasswordModalComponent } from './ExtraComponents/reset-password-modal/reset-password-modal.component';
import { HistorialOrdenesModalComponent } from './ExtraComponents/historial-ordenes-modal/historial-ordenes-modal.component';

import { ConfirmarCancelarOrdenModalComponent } from './ExtraComponents/confirmar-cancelar-orden-modal/confirmar-cancelar-orden-modal/confirmar-cancelar-orden-modal.component';
import { AgregarObservacionOrdenModalComponent } from './ExtraComponents/agregar-observacion-orden-modal/agregar-observacion-orden-modal/agregar-observacion-orden-modal.component';
import { HistorialCajaComponent } from './ExtraComponents/historial-caja/historial-caja.component';
import { PagosCajaModalComponent } from './ExtraComponents/pagos-caja-modal/pagos-caja-modal.component';
import { MesasComponent } from './components/mesas/mesas/mesas.component';
import { AgregarMesaModalComponent } from './ExtraComponents/agregar-mesa-modal/agregar-mesa-modal/agregar-mesa-modal.component';
import { ModificarMesaModalComponent } from './ExtraComponents/modificar-mesa-modal/modificar-mesa-modal/modificar-mesa-modal.component';
import { EliminarMesaModalComponent } from './ExtraComponents/eliminar-mesa-modal/eliminar-mesa-modal/eliminar-mesa-modal.component';
import { ConsultarOrdenCajaComponent } from './ExtraComponents/consultar-orden-caja/consultar-orden-caja.component';
import { PagosOrdenCajaModalComponent } from './ExtraComponents/pagos-orden-caja-modal/pagos-orden-caja-modal.component';
import { ModificarOrdenModalComponent } from './ExtraComponents/modificar-orden-modal/modificar-orden-modal/modificar-orden-modal.component';
import { EliminarItemOrdenComponent } from './ExtraComponents/eliminar-item-orden/eliminar-item-orden.component';
import { OrganizacionComponent } from './components/organizacion/organizacion/organizacion.component';
import { GestionHomesComponent } from './components/gestion-homes/gestion-homes.component';
import { ConfirmarModificarOrdenComponent } from './ExtraComponents/confirmar-modificar-orden/confirmar-modificar-orden.component';
import { ConfirmarEliminarOrdenCajaComponent } from './ExtraComponents/confirmar-eliminar-orden-caja/confirmar-eliminar-orden-caja.component';
import { ConfirmarOrdenMenuMozoComponent } from './ExtraComponents/confirmar-orden-menu-mozo/confirmar-orden-menu-mozo.component';
import { ConsultarOrdenMozoComponent } from './ExtraComponents/consultar-orden-mozo/consultar-orden-mozo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HistorialMozoComponent } from './ExtraComponents/historial-mozo/historial-mozo/historial-mozo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCocinaComponent,
    CurrentTimeComponent,
    FooterCajaComponent,
    HeaderComponent,
    HomeCajaComponent,
    HomeAdminComponent,
    LoginComponent,
    InventarioComponent,
    AgregarItemModalComponent,
    ModificarItemModalComponent,
    EliminarItemModalComponent,
    GestionUsuariosComponent,
    GestionEmpleadosComponent,
    GestionClientesComponent,
    UnauthorizedComponent,
    MesasPrototypeComponent,
    AgregarStockModalComponent,
    QuitarStockModalComponent,
    BackOfficeMenuComponent,
    AgregarItemMenuModalComponent,
    ConsultarItemMenuModalComponent,
    ModificarItemMenuModalComponent,
    ConfirmarAccionModalComponent,
    EliminarItemMenuModalComponent,
    HomeMozoComponent,
    MenuMozoComponent,
    OrdenesMesaComponent,
    AgregarOrdenModalComponent,
    EditarOrdenModalComponent,
    LiberarMesaModalComponent,
    ResumenOrdenModalComponent,
    HistorialVentasComponent,
    InfoOrdenModalComponent,
    AgregarEmpleadoModalComponent,
    EditarEmpleadoModalComponent,
    EliminarEmpleadoModalComponent,
    AgregarClienteModalComponent,
    EditarClienteModalComponent,
    EliminarClienteModalComponent,
    MovimientosCajaModalComponent,
    OrdenesMesaCajaModalComponent,
    PagarTodoModalComponent,
    PagarParcialModalComponent,
    AccionesBotellasModalComponent,
    AbrirBotellaModalComponent,
    DescontarBotellaModalComponent,
    DisponibilidadMesasModalComponent,
    RetirarEfectivoModalComponent,
    IngresarEfectivoModalComponent,
    VentaBebidaModalComponent,
    HomeMenuComponent,
    SeleccionarItemMenuComponent,
    GrupoMenuComponent,
    ResumenOrdenMenuComponent,
    ConfirmarOrdenMenuComponent,
    ExitoOrdenMenuComponent,
    HomeEstadisticasComponent,
    EstadisticasGeneralesComponent,
    EstadisticasClientesComponent,
    EstadisticasVentasComponent,
    EstadisticasBarraComponent,
    CategoriasComponent,
    AgregarCategoriaModalComponent,
    ModificarCategoriaModalComponent,
    EliminarCategoriaModalComponent,
    GruposComponent,
    AgregarGrupoModalComponent,
    ModificarGrupoModalComponent,
    EliminarGrupoModalComponent,
    PagarOrdenModalComponent,
    ActivarItemMenuModalComponent,
    InfoUsuarioComponent,
    ResetPasswordModalComponent,
    HistorialOrdenesModalComponent,

    ConfirmarCancelarOrdenModalComponent,
    AgregarObservacionOrdenModalComponent,
    HistorialCajaComponent,
    PagosCajaModalComponent,
    MesasComponent,
    AgregarMesaModalComponent,
    ModificarMesaModalComponent,
    EliminarMesaModalComponent,
    ConsultarOrdenCajaComponent,
    PagosOrdenCajaModalComponent,
    ModificarOrdenModalComponent,
    EliminarItemOrdenComponent,
    OrganizacionComponent,
    GestionHomesComponent,
    ConfirmarModificarOrdenComponent,
    ConfirmarEliminarOrdenCajaComponent,
    ConfirmarOrdenMenuMozoComponent,
    ConsultarOrdenMozoComponent,
    HistorialMozoComponent,




  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
