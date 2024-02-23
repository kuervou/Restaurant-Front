import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Grupo } from 'src/app/models/grupo.model';


export interface GetItemsMenuActivoBasicResponse {
  total: number;
  items: ItemMenuResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface ItemMenuResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  grupo: Grupo;
}

@Injectable({
  providedIn: 'root'
})
export class MenuMozoService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo1?: string, valor1?: any, campo2?: string, valor2?: any): Observable<GetItemsMenuActivoBasicResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/itemsMenu/activos/basic?page=${currentPage}&limit=${pageSize}`;

    if (campo1 && valor1) {
        url += `&${campo1}=${valor1}`;
    }

    if (campo2 && valor2) {
        url += `&${campo2}=${valor2}`;
    }

    return this.http.get<GetItemsMenuActivoBasicResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
}

  
}


