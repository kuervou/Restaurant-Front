import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { MenubackofficeService, addItemInventarioRequest, getItemMenuResponse } from 'src/app/services/menubackoffice/menubackoffice.service';

@Component({
  selector: 'app-confirmar-accion-modal',
  templateUrl: './confirmar-accion-modal.component.html',
  styleUrls: ['./confirmar-accion-modal.component.scss']
})
export class ConfirmarAccionModalComponent {
  itemMenuDetails: getItemMenuResponse | null = null;
  loading = false;
  seleccionPorUnidad !: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarAccionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemMenu,
    private backofficeService: MenubackofficeService) { }

    ngOnInit(): void {
      if (this.data && this.data.id) {
        this.getItemsMenu(this.data.id);
      }
    }

    getItemsMenu(id: number): void {
      this.loading = true;
      this.backofficeService.getItemsMenu(id).subscribe({
        next: (response) => {
          this.itemMenuDetails = response;
          // Asumiendo que la propiedad 'porUnidad' viene en los datos de respuesta y es booleana
          this.seleccionPorUnidad = response.ItemInventarios.some(item => item.porUnidad);
          this.loading = false;
        },
        error: (error) => {
          // Puedes manejar el error aquí si es necesario, por ejemplo, mostrar un mensaje al usuario.
          console.error('Error fetching item menu details:', error);
          this.loading = false;
        }
      });
    }
  

    onConfirm() {
      // Asegúrate de que itemMenuDetails y seleccionPorUnidad estén definidos en tu componente.
      if (!this.itemMenuDetails) {
        // Manejar el caso donde itemMenuDetails es null o undefined
        console.error('itemMenuDetails es null o undefined');
        return;
      }
      
      // Mapea los itemsInventario para obtener solo las IDs.
      const formattedItems = this.itemMenuDetails.ItemInventarios.map(itemInventario => {
        return { id: itemInventario.id };
      });
    
      // Toma el valor de seleccionPorUnidad para establecerlo en el request.
      const itemToSubmit: addItemInventarioRequest = {
        itemsInventario: formattedItems,
        porUnidad: null // Asegúrate de que esta propiedad refleje la selección actual del usuario
      };
    
      // Aquí asumimos que tienes el id del itemMenu al que pertenecen estos itemsInventario.
      const itemMenuId = this.itemMenuDetails.id; // Asegúrate de reemplazarlo con el camino correcto a la id.
    
      // Envía la request al servicio.
      this.backofficeService.removeItemsInventario(itemMenuId, itemToSubmit).subscribe({
        next: (response) => {
          // Maneja la respuesta exitosa aquí.
          console.log('Operación exitosa', response);
          // Aquí puedes realizar acciones adicionales como cerrar un modal o mostrar un mensaje al usuario.
        },
        error: (error) => {
          // Maneja los errores aquí.
          console.error('Error al enviar la request', error);
          // Muestra al usuario un mensaje de error si es necesario.
        }
      });

      this.dialogRef.close();
    }
    

  onCancel(): void {
    this.dialogRef.close(false); // retornamos false si cancela
  }

}
