import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';


export interface CreateMovimientoRequest {
  fecha: string;
  hora: string;
  tipo: string; 
  observacion?: string;
  total: number;
  empleadoId: number;
  cajaId: number;
}

export interface CreateMovimientoResponse {
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  post(movimiento: CreateMovimientoRequest): Observable<CreateMovimientoResponse> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this.http.post<CreateMovimientoResponse>(`${this.apiUrl}/movimientos`, movimiento, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

}
