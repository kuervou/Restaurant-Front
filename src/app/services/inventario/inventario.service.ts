import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { Categoria } from 'src/app/models/categoria.model';

export interface CreateItemRequest {
  nombre: string;
  descripcion: string;
  stock: number;
  cantxCasillero: number;
  costo: number;
  porUnidad: boolean;
  categoriaId: number;
}

export interface CreateItemResponse {
  total: number,
  item: {
    id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    cantxCasillero: number;
    costo: number;
    porUnidad: boolean;
    categoria: Categoria;
    createdAt: Date,
    updatedAt: Date,
  };
}

export interface GetAllItemResponse {
  total: number;
  items: ItemResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface ItemResponse {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  cantxCasillero: number;
  costo: number;
  ventaPorUnidad: boolean;
  categoria: Categoria;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockItemRequest {
    amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllItemResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/itemsInventario?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllItemResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
}

  getById(id : number): Observable<ItemResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ItemResponse>(`${this.apiUrl}/itemsInventario/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }


  create(item: CreateItemRequest): Observable<CreateItemResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateItemResponse>(`${this.apiUrl}/itemsInventario`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: CreateItemRequest): Observable<CreateItemResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CreateItemResponse>(`${this.apiUrl}/itemsInventario/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/itemsInventario/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  updateStock(id:number, amount: StockItemRequest){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(amount);
    return this.http.put<CreateItemResponse>(`${this.apiUrl}/itemsInventario/${id}/stock`,amount, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }
}
