import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';

export interface CreateClienteRequest {
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface CreateClienteResponse {
  cliente: {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    cuenta: number,
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ClienteResponse {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  cuenta: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllClientesResponse{
  total: number;
  items: ClienteResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/clientes?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
      url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllClientesResponse>(url, { headers }).pipe(
      catchError(this.errorHandler.handleError)
  );
  }

  getAllClientes(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<CreateClienteResponse>(`${this.apiUrl}/clientes`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  //Esta funcion debería ser la que cumpla la funcion de la anterior, pero como note que el tipo de respuesta era diferente, la deje para no romper nada de lo que ya estaba hecho
  getAllClientesByLimit(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllClientesResponse>(`${this.apiUrl}/clientes?limit=-1`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  create(cliente:CreateClienteRequest): Observable<CreateClienteResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateClienteResponse>(`${this.apiUrl}/clientes`, cliente, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  update(id: number, cliente: CreateClienteRequest): Observable<CreateClienteResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<CreateClienteResponse>(`${this.apiUrl}/clientes/${id}`, cliente, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/clientes/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }
}
