import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-homes',
  templateUrl: './gestion-homes.component.html',
  styleUrls: ['./gestion-homes.component.scss']
})
export class GestionHomesComponent {
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
