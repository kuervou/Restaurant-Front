import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent {

  constructor(private errorHandler:ErrorHandlingService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
