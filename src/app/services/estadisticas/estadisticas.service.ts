import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';

export interface ItemInventario {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  costo: number;
  cantxCasillero: number;
  createdAt: string;
  updatedAt: string;
  ventaPorUnidad: number;
  categoria: {
      id: number;
      nombre: string;
      createdAt: string;
      updatedAt: string;
  };
}

export interface ItemsInventarioResponse {
  total: number;
  items: ItemInventario[];
}

export interface LogEntry {
  id: number;
  fechaHoraAbierta: string;
  fechaHoraCerrada: string;
  itemInventarioId: number;
  createdAt: string;
  updatedAt: string;
  cantTragos: number;
  fechaAbiertaUy: string;
  horaAbiertaUy: string;
  fechaCerradaUy: string;
  horaCerradaUy: string;
}

export interface LogsResponse {
  count: number;
  rows: LogEntry[];
}

export interface EstadisticaHoraPico {
  hora: string;
  cantidadOrdenes: number;
}

export interface EstadisticasIngresoMes {
  fecha: string;
  totalIngresos: number;
  cantidadOrdenes: number;
}

export interface EstadisticasIngresoAnio {
  mes: number;
  totalIngresos: number;
  cantidadOrdenes: number;
}

export interface TopCliente {
  clienteId: number;
  totalConsumo: number;
  cantidadOrdenes: number;
  nombreCliente: string;
  apellidoCliente: string;
}

export interface TopItemMenu {
  itemMenuId: number;
  cantidadVendida: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getItemsInventarioTrago(porUnidad: boolean): Observable<ItemsInventarioResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Incluir parámetro de consulta en la URL
    const url = `${this.apiUrl}/itemsInventario?porUnidad=${porUnidad}`;

    return this.http.get<ItemsInventarioResponse>(url, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }  

  getLogsPorItem(itemId: number): Observable<LogsResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<LogsResponse>(`${this.apiUrl}/logs/${itemId}`, { headers })
      .pipe(catchError(this.errorHandler.handleError));
  }  

  // En tu orden.service.ts

getVentasEstadisticas(filterType: string, filterValue: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  let url = `${this.apiUrl}/ordenes/estadisticas/ventas`;

  // Dependiendo del tipo de filtro seleccionado, se añade a la URL
  if (filterType && filterValue) {
    url += `?${filterType}=${filterValue}`;
  }

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.errorHandler.handleError)
  );
}

getOrdenesProcesadasEstadisticas(filterType: string, filterValue: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  let url = `${this.apiUrl}/ordenes/estadisticas/cantOrdenesProcesadas`;

  // Dependiendo del tipo de filtro seleccionado, se añade a la URL
  if (filterType && filterValue) {
    url += `?${filterType}=${filterValue}`;
  }

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.errorHandler.handleError)
  );
}

// Nueva función para obtener las estadísticas de consumo de clientes
getConsumoClientesEstadisticas(filterType: string, filterValue: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  let url = `${this.apiUrl}/ordenes/estadisticas/consumoClientes`;

  // Dependiendo del tipo de filtro seleccionado, se añade a la URL
  if (filterType && filterValue) {
    url += `?${filterType}=${filterValue}`;
  }

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.errorHandler.handleError)
  );
}

getConsumoPorClienteId(clienteId: number, filterType: string, filterValue: string): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  let url = `${this.apiUrl}/ordenes/estadisticas/consumoPorClienteId/${clienteId}`;

  if (filterType && filterValue) {
    url += `?${filterType}=${filterValue}`;
  }

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.errorHandler.handleError)
  );
}

getEstadisticasHorasPico(dia: string): Observable<EstadisticaHoraPico[]> {
  const url = `${this.apiUrl}/ordenes/estadisticas/horasPico?dia=${dia}`;
  return this.http.get<EstadisticaHoraPico[]>(url).pipe(
    catchError(this.handleError)
  );
}
private handleError(error: any) {
  // Tu lógica de manejo de errores
  return throwError(() => new Error(error.message || 'Error del servidor'));
}

getIngresoEnMes(mes: number): Observable<EstadisticasIngresoMes[]> {
  const url = `${this.apiUrl}/ordenes/estadisticas/ingresoEnMes?mes=${mes}`;
  return this.http.get<EstadisticasIngresoMes[]>(url).pipe(
    catchError(this.handleError)
  );
}

getIngresoEnAnio(anio: number): Observable<EstadisticasIngresoAnio[]> {
  const url = `${this.apiUrl}/ordenes/estadisticas/ingresoEnAnio?anio=${anio}`;
  return this.http.get<EstadisticasIngresoAnio[]>(url).pipe(
    catchError(this.handleError)
  );
}

getTopClientes(filterType: string, filterValue: string): Observable<TopCliente[]> {
  const url = `${this.apiUrl}/ordenes/estadisticas/top5Clientes?${filterType}=${filterValue}`;
  return this.http.get<TopCliente[]>(url).pipe(
    catchError(this.errorHandler.handleError)
  );
}

getTopItemsMenu(filterType: string, filterValue: string): Observable<TopItemMenu[]> {
  const url = `${this.apiUrl}/ordenes/estadisticas/top5ItemsMenu?${filterType}=${filterValue}`;
  return this.http.get<TopItemMenu[]>(url).pipe(
    catchError(this.errorHandler.handleError)
  );
}
}
