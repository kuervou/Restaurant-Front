import { Component } from '@angular/core';
import { AbrirBotellaModalComponent } from '../abrir-botella-modal/abrir-botella-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DescontarBotellaModalComponent } from '../descontar-botella-modal/descontar-botella-modal.component';

@Component({
  selector: 'app-acciones-botellas-modal',
  templateUrl: './acciones-botellas-modal.component.html',
  styleUrls: ['./acciones-botellas-modal.component.scss']
})
export class AccionesBotellasModalComponent {

  

  constructor(public dialog: MatDialog) {}

  openAbrirBotellaModal(): void {
    const dialogRef = this.dialog.open(AbrirBotellaModalComponent, {
      width: '20rem',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });

}

openDescontarBotellaModal(): void {
  const dialogRef = this.dialog.open(DescontarBotellaModalComponent, {
    width: '20rem',
    
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('El modal fue cerrado', result);
    // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
  });
}

}
