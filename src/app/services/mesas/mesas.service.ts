import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface GetAllMesasResponse {
  items: MesasResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface MesasResponse {
  id: number;
  nroMesa: number;
  libre: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MesasRequest {
    mesas: MesasResponse[];
}

export interface MesasOcupadasResponse {
    mesas: MesasResponse[];
    totalCount: number;
    libreCount: number;
    ocupadasCount: number;
}

export interface CreateMesaRequest{
  nroMesa : number;
  libre : boolean;
}

export interface UpdateMesaRequest{
  libre : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<GetAllMesasResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/mesas`;

    return this.http.get<GetAllMesasResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getOcupadas(): Observable<MesasOcupadasResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/mesas/ocupadas`;

    return this.http.get<MesasOcupadasResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  create(mesa: CreateMesaRequest): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(`${this.apiUrl}/mesas`, mesa, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  update(id: number, item: UpdateMesaRequest): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<string>(`${this.apiUrl}/mesas/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  updateMesa(id: number, item: CreateMesaRequest): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<string>(`${this.apiUrl}/mesas/${id}`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  remove(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}/mesas/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

}
