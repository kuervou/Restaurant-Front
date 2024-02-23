import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Grupo } from 'src/app/models/grupo.model';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { Item } from 'src/app/models/item.model';

export interface CreateItemMenuRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  grupoId: number;
}

export interface CreateItemMenuResponse {
  total: number,
  item: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    grupoId: number;
  };
}
  
export interface GetAllItemMenuResponse {
  total: number;
  items: ItemMenuResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface ItemMenuResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  grupo: Grupo;
  activo: boolean;
}

export interface addItemInventarioRequest {
  itemsInventario: { id: number }[];
  porUnidad: boolean | null;
}


export interface addItemInventarioResponse{
  message: string;
  items : ItemMenu;
}

export interface getItemMenuResponse{
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
  grupo: Grupo;
  ItemInventarios: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class MenubackofficeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/itemsMenu?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllItemMenuResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  //getItem por id
  getItem(id: number): Observable<ItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ItemMenuResponse>(`${this.apiUrl}/itemsMenu/${id}`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  create(item: CreateItemMenuRequest): Observable<CreateItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateItemMenuResponse>(`${this.apiUrl}/itemsMenu`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: CreateItemMenuRequest): Observable<CreateItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CreateItemMenuResponse>(`${this.apiUrl}/itemsMenu/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/itemsMenu/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  activar(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch<any>(`${this.apiUrl}/itemsMenu/${id}/activate`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  addItemsInventario(id: number, item: addItemInventarioRequest): Observable<addItemInventarioResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<addItemInventarioResponse>(`${this.apiUrl}/itemsMenu/${id}/addItemsInventario`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  removeItemsInventario(id: number, item: addItemInventarioRequest): Observable<addItemInventarioResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<addItemInventarioResponse>(`${this.apiUrl}/itemsMenu/${id}/removeItemsInventario`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  getItemsMenu(id: number): Observable<getItemMenuResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<getItemMenuResponse>(`${this.apiUrl}/itemsMenu/${id}/itemsMenuInventario`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }
  
}
