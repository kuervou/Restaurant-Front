import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  role !: string;

constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

 /*redirectUserBasedOnRole() {
  const storedRole = localStorage.getItem('role');

  if (typeof storedRole === 'string') {
    this.role = storedRole;
    this.authService.redirectUserBasedOnRole(this.role);
  } else {
    console.error('El valor almacenado en "role" no es una cadena.');
  }
}*/

}
