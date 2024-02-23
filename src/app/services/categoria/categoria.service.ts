import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { environment } from 'src/environments/environments';

export interface GetAllCategoriasResponse {
  total: number;
  items: CategoriasResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface CreateCategoriaRequest{
  nombre: string;
}

export interface CategoriasResponse {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllCategoriaResponse {
  total: number;
  items: CategoriaResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface CategoriaResponse {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAllCats(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllCategoriaResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/categorias?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllCategoriaResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getAll(): Observable<GetAllCategoriasResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllCategoriasResponse>(`${this.apiUrl}/categorias`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getById(id : number): Observable<Categoria>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  getCatByNombre(valor?: any): Observable<GetAllCategoriaResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/categorias?page=1&limit=1&nombre=`;

    if (valor) {
        url += valor;
    }

    return this.http.get<GetAllCategoriaResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  create(categoria: CreateCategoriaRequest): Observable<CategoriaResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CategoriaResponse>(`${this.apiUrl}/categorias`, categoria, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: CreateCategoriaRequest): Observable<CategoriaResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CategoriaResponse>(`${this.apiUrl}/categorias/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/categorias/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

}
