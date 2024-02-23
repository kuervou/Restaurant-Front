import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordModalComponent } from 'src/app/ExtraComponents/reset-password-modal/reset-password-modal.component';
import { Empleado } from 'src/app/models/empleado.model';
import { AuthService, ResetPasswordRequest } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss']
})
export class InfoUsuarioComponent {

  usuario: Empleado = {} as Empleado;

  
  constructor(private router: Router, private authService:AuthService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const userData = localStorage.getItem('empleado');
    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log(this.usuario);
    }
  }

  openResetPasswordModal(): void {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '15rem',
      data: { userId: this.usuario.id } // Si necesitas pasar datos
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contiene la contraseña actual y la nueva
        console.log('Dialog result:', result);
        // Aquí puedes llamar al servicio para cambiar la contraseña
      }
    });
  }

  logout() {
    // Aquí deberías implementar la lógica para cerrar sesión
    // Por ejemplo, limpiar localStorage y redirigir al login
    localStorage.clear();
     this.router.navigate(['/login']); // Asegúrate de importar Router y manejar la navegación correctamente
  }
}
