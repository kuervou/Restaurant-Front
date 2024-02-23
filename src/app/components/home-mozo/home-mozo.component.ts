import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgregarOrdenModalComponent } from 'src/app/ExtraComponents/agregar-orden-modal/agregar-orden-modal.component';
import { LiberarMesaModalComponent } from 'src/app/ExtraComponents/liberar-mesa-modal/liberar-mesa-modal.component';
import { Mesa } from 'src/app/models/mesa.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { MesaService, mesasOcupadasResponse } from 'src/app/services/mesa/mesa.service'; // Asegúrate de importar la interfaz mesasOcupadasResponse

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss']
})
export class HomeMozoComponent implements OnInit {
  mesas: Mesa[] = [];

  constructor(public dialog: MatDialog, private mesaService: MesaService, private errorHandler: ErrorHandlingService, private router: Router) {}

  ngOnInit() {
    this.getMesasOcupadas();
  }

  getMesasOcupadas() {
    this.mesaService.getOcupadas().subscribe(
      (data: mesasOcupadasResponse) => {
        this.mesas = data.mesas;
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al cargar las mesas ocupadas', error);
      }
    );
  }

  openDialog(mesa: Mesa): void {
    const dialogRef = this.dialog.open(LiberarMesaModalComponent, {
      width: '30rem',
      data: { mesa: mesa } // Pasar la mesa aquí
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      this.getMesasOcupadas();
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openOrdenModal(){
    const dialogRef = this.dialog.open(AgregarOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  navigateTo(route: string, numberParam: any) {
    this.router.navigate([route], {
      queryParams: { num: numberParam }
    });
  }
  
}
