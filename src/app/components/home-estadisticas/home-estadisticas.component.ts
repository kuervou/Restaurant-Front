import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-estadisticas',
  templateUrl: './home-estadisticas.component.html',
  styleUrls: ['./home-estadisticas.component.scss']
})
export class HomeEstadisticasComponent {

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
