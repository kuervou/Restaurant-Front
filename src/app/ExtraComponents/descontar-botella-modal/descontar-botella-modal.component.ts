import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CajaService, CerrarBotellaRequest, ItemInventario } from 'src/app/services/caja/caja.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-descontar-botella-modal',
  templateUrl: './descontar-botella-modal.component.html',
  styleUrls: ['./descontar-botella-modal.component.scss']
})
export class DescontarBotellaModalComponent {

  selectedDrink!:number;
  drinksList: ItemInventario[] = []; // Esta variable almacenará la lista de bebidas

  constructor(private cajaService: CajaService,
    public dialogRef: MatDialogRef<DescontarBotellaModalComponent>,
    private toastService:ToastService) {}

  ngOnInit(): void {
    this.cajaService.getItemsInventarioTrago(false).subscribe({
      next: (response) => {
        this.drinksList = response.items;
      },
      error: (error) => {
        console.error('Error fetching drinks:', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }

  cerrarUnaBotella(itemInventarioId: number): void {
    const empleadoId = Number(localStorage.getItem('empleadoId'));
    const request: CerrarBotellaRequest = {
      empleadoId: empleadoId,
      itemInventarioId: itemInventarioId
    };
  
    this.cajaService.cerrarBotella(request).subscribe({
      next: (response) => {
        // Manejo de respuesta exitosa
        console.log('La botella se cerró correctamente', response);
        this.toastService.showSuccess('La botella se cerró correctamente');
        this.dialogRef.close();
      },
      error: (error) => {
        // Manejo de errores
        console.error('Error al cerrar la botella', error);
        this.dialogRef.close();
      }
    });
  }
}
