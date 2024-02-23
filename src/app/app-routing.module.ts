import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';

//Cosas del back
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component'
import { MesasPrototypeComponent } from './components/mesas-prototype/mesas-prototype.component';
import { BackOfficeMenuComponent } from './components/back-office-menu/back-office-menu.component';
import { HomeMozoComponent } from './components/home-mozo/home-mozo.component';
import { MenuMozoComponent } from './components/menu-mozo/menu-mozo.component';
import { OrdenesMesaComponent } from './components/ordenes-mesa/ordenes-mesa.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';

import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { GrupoMenuComponent } from './components/grupo-menu/grupo-menu.component';
import { ResumenOrdenMenuComponent } from './components/resumen-orden-menu/resumen-orden-menu.component';
import { HomeEstadisticasComponent } from './components/home-estadisticas/home-estadisticas.component';
import { EstadisticasGeneralesComponent } from './components/estadisticas-generales/estadisticas-generales.component';
import { EstadisticasClientesComponent } from './components/estadisticas-clientes/estadisticas-clientes.component';
import { EstadisticasVentasComponent } from './components/estadisticas-ventas/estadisticas-ventas.component';
import { EstadisticasBarraComponent } from './components/estadisticas-barra/estadisticas-barra.component';

import { AuthGuard } from './middlewares/auth.guard';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component';
import { GruposComponent } from './components/grupos/grupos/grupos.component';
import { InfoUsuarioComponent } from './components/info-usuario/info-usuario.component';
import { HeaderComponent } from './ExtraComponents/header/header.component';
import { MesasComponent } from './components/mesas/mesas/mesas.component';
import { OrganizacionComponent } from './components/organizacion/organizacion/organizacion.component';
import { GestionHomesComponent } from './components/gestion-homes/gestion-homes.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'homecocina', component:HomeCocinaComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Cocina'] }},
  {path:'homecaja', component:HomeCajaComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'homeadmin', component:HomeAdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'login', component:LoginComponent},
  {path:'inventario', component:InventarioComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionusers', component:GestionUsuariosComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionempleados', component:GestionEmpleadosComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionclientes', component:GestionClientesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path:'backOfficeMenu', component:BackOfficeMenuComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'homemozo', component:HomeMozoComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'ordenesmesa', component:OrdenesMesaComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'menumozo', component:MenuMozoComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'historialVentas', component:HistorialVentasComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'categorias', component:CategoriasComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'grupos', component:GruposComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'homemenu', component: HomeMenuComponent },
  {path: 'homemenu/:mesa', component: HomeMenuComponent },
  {path:'grupomenu/:id', component:GrupoMenuComponent},
  {path: 'resumenordenmenu', component:ResumenOrdenMenuComponent},
  {path: 'estadisticas', component:HomeEstadisticasComponent},
  {path: 'estadisticasgenerales', component:EstadisticasGeneralesComponent},
  {path: 'estadisticasclientes', component:EstadisticasClientesComponent},
  {path: 'estadisticasventas', component:EstadisticasVentasComponent},
  {path: 'estadisticasbarra', component:EstadisticasBarraComponent},
  {path: 'infousuario', component:InfoUsuarioComponent},
  {path: 'header', component:HeaderComponent},
  {path: 'mesas', component:MesasComponent},
  {path: 'organizacion', component:OrganizacionComponent},
  {path: 'gestionhome', component:GestionHomesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
