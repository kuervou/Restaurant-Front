import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastService: ToastService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Registro del error
        console.error('Error detected in interceptor:', error);
      
        // Retroalimentación al usuario
        
        if(error.error.error){
          this.toastService.showError(error.error.error);
        }
        else if (error.error.message) {
          this.toastService.showError(error.error.message);
        }
        else {
          this.toastService.showError('Ha ocurrido un error. Por favor, intenta nuevamente.');
        }
        // Redirección basada en el error
        /*if (error.status === 401) {
          this.router.navigate(['/login']);  // Redirige al usuario al inicio de sesión
        } else if (error.status === 403) {
          this.router.navigate(['/unauthorized']);  // Informa al usuario que no tiene permisos
        }*/
      
        return throwError(() => error);
      })
    );
  }
}