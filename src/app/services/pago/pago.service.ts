import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { environment } from 'src/environments/environments';
import { Pago } from 'src/app/models/pago.model';




export interface CreatePagoRequest {
  fecha: string;
  hora: string;
  metodoPago: string;
  total: number;
  empleadoId: number;
  cajaId: number;
  ordenId: number;
}

export interface PagosResponse {
  total: number;
  items: Pago[];
}

export interface CreatePagoResponse {
  message: string;
  nuevoPago: Pago;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  crearPago(pago: CreatePagoRequest): Observable<CreatePagoResponse> {
    return this.http.post<CreatePagoResponse>(`${this.apiUrl}/pagos`, pago).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getPagos(fecha?: string, page?: number, limit?: number, ordenId?: number): Observable<PagosResponse> {
    let url = `${this.apiUrl}/pagos`;
    if (fecha) {
      url += `?fecha=${fecha}`;
    }
    if (page && limit) {
      url += `?page=${page}&limit=${limit}`;
    }
    if (ordenId) {
      url += `?ordenId=${ordenId}`;
    }
    return this.http.get<PagosResponse>(url).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getPagoById(id: number): Observable<Pago> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Pago>(`${this.apiUrl}/pagos/${id}` ).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  deletePago(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/pagos/${id}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
