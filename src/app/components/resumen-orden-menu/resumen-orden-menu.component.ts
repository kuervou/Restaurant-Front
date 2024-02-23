import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ConfirmarOrdenMenuComponent } from 'src/app/ExtraComponents/confirmar-orden-menu/confirmar-orden-menu.component';
import { itemSeleccionado } from '../home-menu/home-menu.component';

@Component({
  selector: 'app-resumen-orden-menu',
  templateUrl: './resumen-orden-menu.component.html',
  styleUrls: ['./resumen-orden-menu.component.scss']
})
export class ResumenOrdenMenuComponent {

  @ViewChild('bebidasPanel') resumenPanel!: MatExpansionPanel;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ResumenOrdenMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemsMenu: itemSeleccionado[], observaciones: string, totalOrden: number }
  ) {}

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
}

get observacionesSeparadas(): string[] {
  return this.data.observaciones.split(' & ');
}

openDialog(): void {
  const dialogRef = this.dialog.open(ConfirmarOrdenMenuComponent, {
    width: '80%',
    data: {
      itemsMenu: this.data.itemsMenu,
      observaciones: this.data.observaciones,
      totalOrden: this.data.totalOrden
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El dialogo ConfirmarOrdenMenuComponent fue cerrado', result);
    this.dialogRef.close();
    // Aquí puedes hacer algo con el resultado si es necesario, como volver a la vista principal.
  });
}
}
