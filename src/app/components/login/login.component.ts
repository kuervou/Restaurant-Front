import { Component } from '@angular/core';
import { AuthService, LoginRequest } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nick: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    const rol = localStorage.getItem('role');

    if (rol) {
      this.authService.redirectUserBasedOnRole(rol);
    }
  }

  login() {
    const loginData: LoginRequest = {
      nick: this.nick,
      password: this.password
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login Success:', response)
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('role', response.empleado.rol);
        localStorage.setItem('empleadoId', response.empleado.id.toString());
        localStorage.setItem('empleadoNombre', response.empleado.nombre);
        localStorage.setItem('empleado', JSON.stringify(response.empleado));
        this.toastService.showSuccess("Ha iniciado sesión con éxito");
        this.authService.redirectUserBasedOnRole(response.empleado.rol);
      },
      error: (error) => {
        console.error('Login Error:', error.error);
        this.toastService.showError("Los datos de inicio de sesión son incorrectos.");
      }
    });
  }
  
}