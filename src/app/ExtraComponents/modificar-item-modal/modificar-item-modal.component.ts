import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Item } from 'src/app/models/item.model';
import { CategoriaService, CategoriasResponse, GetAllCategoriasResponse } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modificar-item-modal',
  templateUrl: './modificar-item-modal.component.html',
  styleUrls: ['./modificar-item-modal.component.scss']
})
export class ModificarItemModalComponent {
  categorias: Categoria[] = [];
  ItemForm!: FormGroup; // No es necesario inicializarlo aquí
  idItem: number = this.item.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemModalComponent>,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public item: Item) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  initEmptyForm() {
    this.ItemForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: [''], // Asegúrate de que esta propiedad exista y tenga el valor correcto
      cantxCasillero: [''],
      porUnidad: [''], // Configura el valor inicial basado en la propiedad porUnidad
      stock: [''],
      costo: [''],
    });
  }

  getCategorias() {
    this.categoriaService.getAll().subscribe(
      (response: GetAllCategoriasResponse) => {
        if (Array.isArray(response.items)) {
          const categorias: CategoriasResponse[] = response.items.map(categoria  => ({
            id: categoria.id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
            createdAt: categoria.createdAt,
            updatedAt: categoria.updatedAt,
            // Añade otras propiedades si es necesario
          }));
  
          this.categorias = categorias; // Asignar el resultado mapeado a la variable de categorías
          this.initForm();
        } else {
          console.error('La respuesta del servicio no es un array válido.');
        }
      },
      (error) => {
        catchError(this.errorHandler.handleError);
      }
    );
  }

  initForm() {
    // Asegúrate de usar this.item.categoriaId si esa es la propiedad que contiene el ID
    this.ItemForm = this.formBuilder.group({
      nombre: [this.item.nombre],
      descripcion: [this.item.descripcion],
      categoriaId: [this.item.categoria.id], // Asegúrate de que esta propiedad exista y tenga el valor correcto
      cantxCasillero: [this.item.cantxCasillero],
      porUnidad: [this.item.porUnidad ? 'unidad' : 'casillero'], // Configura el valor inicial basado en la propiedad porUnidad
      stock: [this.item.stock],
      costo: [this.item.costo],
    });
  }

  updateItem(item: any){
    this.inventarioService.update(this.idItem, item).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item modificado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }}
    );
  }

  onSubmit() {
    if (this.ItemForm.valid) {
      const formData = this.ItemForm.value;
      
      // Verificar si el campo 'nombre' ha cambiado
      if (formData.nombre === this.item.nombre) {
        delete formData.nombre; // Si no ha cambiado, eliminar la propiedad del objeto
      }
  
      if (formData.porUnidad === "unidad") {
        formData.porUnidad = true;
      } else {
        formData.porUnidad = false;
      }
  
      this.updateItem(formData);
      // No se necesita cerrar el diálogo aquí ya que se cierra en updateItem en caso de éxito
    }
  }

  // Puedes agregar más métodos según lo necesites, por ejemplo, para guardar los cambios.

}
