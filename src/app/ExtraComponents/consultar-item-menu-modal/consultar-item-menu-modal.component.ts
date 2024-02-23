import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Observable, catchError } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllItemResponse, InventarioService } from 'src/app/services/inventario/inventario.service';
import { MenubackofficeService, addItemInventarioRequest, getItemMenuResponse } from 'src/app/services/menubackoffice/menubackoffice.service';


@Component({
  selector: 'app-consultar-item-menu-modal',
  templateUrl: './consultar-item-menu-modal.component.html',
  styleUrls: ['./consultar-item-menu-modal.component.scss']
})
export class ConsultarItemMenuModalComponent {
  catId: number = 0;
  ingredients: number[] = []; // Lista de ingredientes seleccionados
  items: Item[] = [];
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  saleType: boolean | null = null;; // Valor por defecto, puedes cambiarlo si lo necesitas
  loading = false;
  itemMenuDetails: getItemMenuResponse | null = null;
  seleccionPorUnidad !: boolean;
  displayedChips: any[] = [];

  constructor(public dialogRef: MatDialogRef<ConsultarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService:InventarioService,
    private errorHandler:ErrorHandlingService,
    private menuService: MenubackofficeService,
    private categoriaService: CategoriaService,
    private backofficeService: MenubackofficeService
    ) { }

    addIngredient(event: MatSelectChange) {
      const selectedItemId = event.value;
      const selectedItem = this.items.find(item => item.id === selectedItemId);
  
      // Asegúrate de que el ítem no esté ya en la lista de chips mostrados
      if (selectedItem && !this.displayedChips.some(chip => chip.id === selectedItem.id)) {
        this.displayedChips.push({
          id: selectedItem.id,
          nombre: selectedItem.nombre
          // Copia aquí otras propiedades necesarias del ítem para los chips
        });
        this.ingredients.push(selectedItemId); // Sigue manteniendo la lista de ingredientes seleccionados
      }
    }

ngOnInit() {
  this.getItems();
  this.getItemsMenu(this.data.id);
  this.initializeDisplayedChips();
}

initializeDisplayedChips() {
  // Solo si itemMenuDetails está definido y tiene ítems, actualizamos displayedChips
  if (this.itemMenuDetails && this.itemMenuDetails.ItemInventarios) {
    this.displayedChips = this.itemMenuDetails.ItemInventarios.map(item => ({
      id: item.id,
      nombre: item.nombre
      // Copia aquí otras propiedades necesarias de los ítems para los chips
    }));
  }
}

getFilteredItems() {
  // Asumimos que `itemMenuDetails?.ItemInventarios` y `items` están definidos y contienen los datos relevantes.
  if (this.itemMenuDetails) {
    // Creamos un Set con los IDs de los elementos ya presentes en itemMenuDetails para una búsqueda más eficiente.
    const presentItemIds = new Set(this.itemMenuDetails.ItemInventarios.map(item => item.id));
    // Filtramos el arreglo de `items` para excluir los que ya están presentes.
    this.items = this.items.filter(item => !presentItemIds.has(item.id));
  }
}

getItemsMenu(id: number): void {
  this.loading = true;
  this.backofficeService.getItemsMenu(id).subscribe({
    next: (response) => {
      this.itemMenuDetails = response;
      this.getFilteredItems();
      this.initializeDisplayedChips();

      // Establecemos saleType basado en ItemInventarios si no está vacío, de lo contrario será null
      this.saleType = response.ItemInventarios.length > 0
        ? response.ItemInventarios.some(item => item.porUnidad)
        : null;

      this.loading = false;
    },
    error: (error) => {
      console.error('Error fetching item menu details:', error);
      this.loading = false;
    }
  });
}

getIdCat(): Promise<number> {
  const nombreCategoria = "Bebidas";
  return new Promise((resolve, reject) => {
    this.categoriaService.getCatByNombre(nombreCategoria).subscribe({
      next: (response) => {
        if (response.items && response.items.length > 0) {
          resolve(response.items[0].id);
        } else {
          console.error('No se encontraron categorías.');
          reject('No se encontraron categorías.');
        }
      },
      error: (error) => {
        console.error("Hubo un error al obtener la categoría: ", error);
        reject(error);
      }
    });
  });
}

async getItems(campo?: any, valor?: any) {
  try {
    const catId = await this.getIdCat();
    this.inventarioService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, "categoriaId", catId).subscribe({
      next: (response: GetAllItemResponse) => {
        const itemsFromResponse = response.items;
      // Recorremos el arreglo de ítems y lo procesamos
      const itemsToAdd = itemsFromResponse.map(item => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        stock: item.stock,
        costo: item.costo,
        cantxCasillero: item.cantxCasillero,
        porUnidad: item.ventaPorUnidad
        // Añade otras propiedades si es necesario
      }));

      this.items = itemsToAdd;
      this.getFilteredItems();
      
      },
      error: (error) => {
        catchError(this.errorHandler.handleError);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

confirmSelection() {
  if (this.saleType && this.displayedChips.length > 1) {
    // Mostrar algún mensaje de error al usuario
    console.error('No se puede agregar más de un ítem cuando la venta es por unidad.');
    return;
  }

  const validations = this.ingredients.map(ingredientId =>
    this.inventarioService.getById(ingredientId).toPromise()
  );

  Promise.all(validations).then(items => {
    // Realizar la validación 2 y 3 aquí
    const isSaleTypeTrue = this.saleType === true;

    const invalidItem = items.find(item => item && ((isSaleTypeTrue && item.ventaPorUnidad == false) || (!isSaleTypeTrue && item.ventaPorUnidad == true)));

    if (invalidItem) {
      // Mostrar algún mensaje de error al usuario
      console.error(`El ítem ${invalidItem.nombre} no cumple con las condiciones de venta.`);
      return;
    }

    // Si todas las validaciones pasan, entonces procedemos a enviar los datos
    const formattedItems = this.ingredients.map(ingredientId => ({ id: ingredientId }));
    const itemToSubmit: addItemInventarioRequest = {
      itemsInventario: formattedItems,
      porUnidad: this.saleType
    };

    const id = this.data.id;

    this.menuService.addItemsInventario(id, itemToSubmit).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error); // Manejo de errores
      }
    });
  }).catch(error => {
    console.error('Ocurrió un error al recuperar los detalles del ítem', error);
  });
}

onCancel(): void {
  this.dialogRef.close(false);
}

borrarItems(){
  // Asegúrate de que displayedChips esté definido en tu componente.
  if (!this.displayedChips || this.displayedChips.length === 0 || this.itemMenuDetails?.ItemInventarios.length === 0) {
    // Manejar el caso donde displayedChips es vacío o no tiene elementos
    console.error('No hay elementos para borrar.');
    return;
  }

  // Mapea los displayedChips para obtener solo las IDs.
  const formattedItems = this.displayedChips.map(chip => {
    return { id: chip.id };
  });

  // Toma el valor de saleType para establecerlo en el request, asegurándote de que esta propiedad refleje la selección actual del usuario.
  const itemToSubmit: addItemInventarioRequest = {
    itemsInventario: formattedItems,
    porUnidad: null // Utiliza saleType que ya refleja la selección del usuario.
  };

  // Aquí asumimos que tienes el id del itemMenu al que pertenecen estos itemsInventario.
  const itemMenuId = this.data.id; // Utiliza data.id que se inyecta en el componente.

  // Envía la request al servicio.
  this.menuService.removeItemsInventario(itemMenuId, itemToSubmit).subscribe({
    next: (response) => {
      // Maneja la respuesta exitosa aquí.
      console.log('Operación exitosa', response);
      // Limpia displayedChips después de la operación exitosa.
      this.displayedChips = [];
      this.ingredients = [];
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

}
