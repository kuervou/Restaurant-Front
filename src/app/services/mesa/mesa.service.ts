import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Mesa } from 'src/app/models/mesa.model';
import { MesasOcupadasResponse } from '../mesas/mesas.service';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';

export interface CreateMesaResponse{
  id: number;
  nroMesa: number;
  libre: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface mesasOcupadasResponse{
  mesas : Mesa[];
  totalCount: number;
  libreCount: number;
  ocupadasCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class MesaService {


  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  obtenerMesas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mesas`);
  }

  actualizarEstadoMesa(id: string, estaLibre: boolean, numeroDeMesa: string): Observable<any> {
    const url = `${this.apiUrl}/mesas/${id}`;
    const estado = { 
      estaLibre: estaLibre,  // En lugar de esta_libre
      numeroDeMesa: numeroDeMesa  // Añadido este campo
    };
    console.log(estado);
    return this.http.put(url, estado);
  }

  getOcupadas(): Observable<MesasOcupadasResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<MesasOcupadasResponse>(`${this.apiUrl}/mesas/ocupadas`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }
  
  getById(id: number): Observable<CreateMesaResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<CreateMesaResponse>(`${this.apiUrl}/mesas/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }
  
}