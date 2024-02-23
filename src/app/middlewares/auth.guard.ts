import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const currentUser = localStorage.getItem('role');

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No hay token');
      localStorage.clear();
      this.router.navigate(['login']);
      return false;
    }

    if (this.isTokenExpirado()) {
      console.log('Su token expiró');
      localStorage.clear();
      this.router.navigate(['login']);
      return false;
    }

    if (currentUser && expectedRoles.includes(currentUser)) {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;
  }

  isTokenExpirado(): boolean {
    const token = localStorage.getItem('authToken');

    console.log('Token:', token); // Para ver el token que estás decodificando

    if (!token) return true;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);

    console.log('Exp:', decodedToken.exp);  // Verificar cuándo expira el token
    console.log('Current Time:', currentTime);  // Verificar la hora actual

    if (decodedToken.exp < currentTime) {
      console.log('Token expirado');
      return true;
    }

    console.log('Token aún válido');
    return false;
  }
}