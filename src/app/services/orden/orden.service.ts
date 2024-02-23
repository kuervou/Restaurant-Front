import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { environment } from 'src/environments/environments';
import { Observable, catchError } from 'rxjs';
import { Orden } from 'src/app/models/orden.model';
import { Pago } from 'src/app/models/pago.model';

export interface CreateOrdenRequest {
  fecha: String;
  hora: String;
  responsable: string | null;
  ocupacion: number;
  observaciones: string;
  clienteId: number | null;
  empleadoId: number;
  items: ItemsRequest[];
  mesas: number[];
  estado : string;
}

export interface CreateOrdenResponse {
  message: string,
  newOrden: {
    id: number;
    fecha: Date;
    hora: Date;
    total: number;
    responsable: string;
    estado: string;
    ocupacion: number;
    observaciones: string;
    paga: boolean;
    clienteId: number;
    empleadoId: number;
    createdAt: Date,
    updatedAt: Date,
  };
}

export interface CreateOrdenClienteRequest {
  fecha: String;
  hora: String;
  responsable: string | null;
  ocupacion: number;
  observaciones: string;
  items: ItemsRequest[];
  mesas: number[];
}

export interface OrdenResponse {
  total: number;
  items: Orden[];
}

//Interfaz con los query params del request. El get all se consulta con page, limit, empleadoId, clienteId, estado
export interface GetAllOrdenesRequest {
  page: number;
  limit: number;
  empleadoId: number;
  clienteId: number;
  estado: string;
}



export interface ItemsRequest{
  itemMenuId: number;
  cantidad: number;
  precio: number;
}


export interface UpdateOrdenRequest {
  fecha?: Date;
  hora?: string;
  responsable?: string;
  estado?: string;
  ocupacion?: number;
  observaciones?: string;
  paga?: boolean;
  clienteId?: number;
  empleadoId?: number;
}

export interface UpdateOrdenResponse {
  message: string;
}

export interface removeMesaRequest{
  mesas: number[];
}

export interface responseInfoPagos{
  ordenesIds: number[];
  totalGeneralPagado: number;
  totalGeneralOrden: number;
  detalles: detalleInfoPagos[];
}

export interface detalleInfoPagos{
  ordenId: number;
  totalPagado: number;
  totalOrden: number;
  paga: boolean;
}

export interface pagarTodoRequest{
  ordenes: number[];
  metodoPago: string;
  cajaId: number;
  empleadoId: number;
}

export interface pagarTodoResponse{
  message: string;
  pagos: nuevoPagoData[];
}

export interface nuevoPagoData{
  nuevoPago: nuevoPago;
  ordenPagada: boolean;
}

export interface nuevoPago{
  id: number;
  fecha: Date;
  hora: Date;
  metodoPago: string;
  total: number;
  ordenId: number;
  cajaId: number;
  empleadoId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface estadoPagosResponse{
  totalPagado : number;
  totalOrden : number;
  paga : boolean;
  infoPagos: Pago[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  create(item: CreateOrdenRequest): Observable<CreateOrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateOrdenResponse>(`${this.apiUrl}/ordenes`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  createCliente(item: CreateOrdenClienteRequest): Observable<CreateOrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateOrdenResponse>(`${this.apiUrl}/ordenes`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  addItem(idOrden : number, itemsPayload: { items: ItemsRequest[] }): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(`${this.apiUrl}/ordenes/${idOrden}/items`, itemsPayload, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  removeItem(idOrden: number, items: number[]): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      items: items // Esta es la lista de IDs de ítems que quieres eliminar
    };

    return this.http.request<string>('delete', `${this.apiUrl}/ordenes/${idOrden}/items`, {
      headers: headers,
      body: body // Aquí agregas el body a la petición delete
    }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  //get all, se consulta con page, limit, empleadoId, clienteId, estado (todos opcionales)
  getAll(currentPage: number, pageSize: number, empleadoId?: number, clienteId?: number, estado?: string, fecha?:string): Observable<OrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/ordenes?page=${currentPage}&limit=${pageSize}`;

    if (empleadoId) {
        url += `&empleadoId=${empleadoId}`;
    }
    if (clienteId) {
      url += `&clienteId=${clienteId}`;
    }
    if (estado) {
      url += `&estado=${estado}`;
    }
    if (fecha) {
      url += `&fecha=${fecha}`;
    }


    return this.http.get<OrdenResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getOrdenesCaja(mesaId?: number): Observable<OrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/ordenes/caja`;
  
    if (mesaId) {
        url += `?mesaId=${mesaId}`;
    }

    return this.http.get<OrdenResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getOcupacion(): Observable<number> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<number>(`${this.apiUrl}/ordenes/ocupacion`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  deleteOrden(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/ordenes/${id}`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getEstadosPagos(id : number): Observable<estadoPagosResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<estadoPagosResponse>(`${this.apiUrl}/ordenes/${id}/estadoPagos`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  updateOrden(id: number, item: UpdateOrdenRequest): Observable<UpdateOrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<UpdateOrdenResponse>(`${this.apiUrl}/ordenes/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getOrdenMesa(id:number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<OrdenResponse>(`${this.apiUrl}/ordenes/mozo?mesaId=${id}`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getHistorialOrdenes(): Observable<OrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/ordenes/historial`;

    return this.http.get<OrdenResponse>(url, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
  getInfoPagos(ids:number[]){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/ordenes/infoPagos/general/?Ids=`;
    ids.forEach((id, index) => {
      if(index == 0){
        url += `${id}`;
      }
      else{
        url += `,${id}`;
      }
    });
    return this.http.get<responseInfoPagos>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
    
  }

  pagarTodo(item: pagarTodoRequest): Observable<pagarTodoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<pagarTodoResponse>(`${this.apiUrl}/ordenes/pagarTodo`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  
}
