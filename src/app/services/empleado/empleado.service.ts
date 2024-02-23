import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface CreateEmpleadoRequest {
  nick: string;
  nombre: string;
  apellido: string;
  password: string;
  telefono: string;
  rol: string;
}

export interface CreateEmpleadoResponse {
  total: number,
  item: {
    id: number;
    nick: string;
    nombre: string;
    apellido: string;
    password: string;
    telefono: string;
    rol: string;
    createdAt: Date,
    updatedAt: Date,
  };
}

export interface GetAllEmpleadosResponse {
  total: number;
  items: EmpleadoResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface EmpleadoResponse {
  id: number;
  nick: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllEmpleadosResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/empleados?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllEmpleadosResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getById(idEmpleado: number): Observable<EmpleadoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<EmpleadoResponse>(`${this.apiUrl}/empleados/${idEmpleado}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  create(empleados: CreateEmpleadoRequest): Observable<CreateEmpleadoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateEmpleadoResponse>(`${this.apiUrl}/empleados`, empleados, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: CreateEmpleadoRequest): Observable<CreateEmpleadoResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CreateEmpleadoResponse>(`${this.apiUrl}/empleados/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/empleados/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

}
