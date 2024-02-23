import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface CreateCompraRequest {
  fecha: string;
  hora: string;
  cantidadxCasillero: number;
  cantidad: number;
  empleadoId: number;
  itemInventarioId: number;
}

export interface CreateCompraResponse {
  message: string;
  result: {
    id: number;
    fecha: Date;
    hora: Date;
    cantidadxCasillero: number;
    cantidad: number;
    empleadoId: number;
    itemInventarioId: number;
    total: number;
    updatedAt: Date;
    createdAt: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  create(compra:CreateCompraRequest): Observable<CreateCompraResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateCompraResponse>(`${this.apiUrl}/compras`, compra, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
