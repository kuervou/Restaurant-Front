import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-exito-orden-menu',
  templateUrl: './exito-orden-menu.component.html',
  styleUrls: ['./exito-orden-menu.component.scss']
})
export class ExitoOrdenMenuComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ExitoOrdenMenuComponent>, private errorHandler:ErrorHandlingService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.dialogRef.close();
  }
}
