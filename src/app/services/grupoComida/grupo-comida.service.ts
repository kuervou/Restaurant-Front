import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface CreateGrupoRequest {
  id: number;
  nombre: string;
  esBebida: boolean;
}

export interface CreateGrupoResponse {
  id: number;
  nombre: string;
  esBebida: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllGruposResponse {
  total: number;
  items: GrupoResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface GetAllGrupoResponse {
  total: number;
  items: GrupoResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface GrupoResponse {
  id: number;
  nombre: string;
  esBebida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GrupoComidaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<GetAllGruposResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllGruposResponse>(`${this.apiUrl}/grupos?page=-1`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }


  getGrupoByNombre(nombre: string): Observable<GetAllGruposResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllGruposResponse>(`${this.apiUrl}/grupos?page=1&limit=1&nombre=${nombre}`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getAllGrupos(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllGrupoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/grupos?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllGrupoResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getGrupoById(id: number): Observable<CreateGrupoResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<CreateGrupoResponse>(`${this.apiUrl}/grupos/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getGrupoByBebida(esBebida: boolean): Observable<GetAllGruposResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllGruposResponse>(`${this.apiUrl}/grupos?esBebida=${esBebida}`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  create(categoria: CreateGrupoRequest): Observable<CreateGrupoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateGrupoResponse>(`${this.apiUrl}/grupos`, categoria, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: CreateGrupoRequest): Observable<CreateGrupoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CreateGrupoResponse>(`${this.apiUrl}/grupos/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/grupos/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

}
