import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbrirBotellaRequest, CajaService, ItemInventario } from 'src/app/services/caja/caja.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-abrir-botella-modal',
  templateUrl: './abrir-botella-modal.component.html',
  styleUrls: ['./abrir-botella-modal.component.scss']
})
export class AbrirBotellaModalComponent {

  selectedDrink!:number;
  drinksList: ItemInventario[] = []; // Esta variable almacenará la lista de bebidas

  constructor(private cajaService: CajaService,
     public dialogRef: MatDialogRef<AbrirBotellaModalComponent>,
     private toastService:ToastService) {}

  ngOnInit(): void {
    this.cajaService.getItemsInventarioTrago(false).subscribe({
      next: (response) => {
        this.drinksList = response.items;
        console.log(this.drinksList);
      },
      error: (error) => {
        console.error('Error fetching drinks:', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }

  // En tu componente donde manejas la apertura de botellas:

abrirUnaBotella(itemInventarioId: number): void {
  const empleadoId = Number(localStorage.getItem('empleadoId'));
  const request: AbrirBotellaRequest = {
    empleadoId: empleadoId,
    itemInventarioId: itemInventarioId
  };

  this.cajaService.abrirBotella(request).subscribe({
    next: (response) => {
      // Manejo de respuesta exitosa
      console.log('Botella abierta con éxito', response);
      this.toastService.showSuccess('Botella abierta con éxito');
      this.dialogRef.close();
    },
    error: (error) => {
      // Manejo de errores
      console.error('Error al abrir la botella', error);
      this.dialogRef.close();
    }
  });
}

}
