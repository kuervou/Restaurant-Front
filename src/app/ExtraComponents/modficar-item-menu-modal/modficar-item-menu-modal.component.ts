import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';
import { Grupo } from 'src/app/models/grupo.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllGruposResponse, GrupoComidaService, GrupoResponse } from 'src/app/services/grupoComida/grupo-comida.service';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modificar-item-menu-modal',
  templateUrl: './modficar-item-menu-modal.component.html',
  styleUrls: ['./modficar-item-menu-modal.component.scss']
})
export class ModificarItemMenuModalComponent {

  grupos: Grupo[] = [];
  ItemMenuForm!: FormGroup; // No es necesario inicializarlo aquí
  selectedImage: any = null;
  idItem: number = this.data.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemMenuModalComponent>,
    private grupoComidaService: GrupoComidaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private backofficeService: MenubackofficeService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

    ngOnInit(): void {
      this.initEmptyForm();
      this.getGrupos();
      
      this.selectedImage = 'data:image/png;base64,' + this.data.imagen;
    }

    initEmptyForm() {
      this.ItemMenuForm = this.formBuilder.group({
        nombre: [''],
        descripcion: ['', Validators.required],
        grupoId: ['', Validators.required],
        precio: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
        imagen: ['']  // Asume que la imagen se manejará como un string base64
      });
    }

    getGrupos() {
      this.grupoComidaService.getAll().subscribe(
        (response: GetAllGruposResponse) => {
          if (Array.isArray(response.items)) {
            const grupos: GrupoResponse[] = response.items.map(categoria  => ({
              id: categoria.id,
              nombre: categoria.nombre,
              esBebida: categoria.esBebida
              // Añade otras propiedades si es necesario
            }));
    
            this.grupos = grupos; // Asignar el resultado mapeado a la variable de categorías
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

    initForm(){
      this.ItemMenuForm = this.formBuilder.group({
        nombre: [this.data.nombre],
        descripcion: [this.data.descripcion],
        grupoId: [this.data.categoria.id, Validators.required],
        precio: [this.data.precio],  // Campo de imagen en base64
        imagen: [this.data.imagen]  // Campo de imagen en base64
    });   
    }

    onImageSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
              this.selectedImage = e.target.result;
              this.ItemMenuForm.patchValue({
                  imagen: e.target.result.split(',')[1]  // Guarda solo el contenido base64, no el tipo de datos
              });
          };
          reader.readAsDataURL(file);
      }
    }

  updateItem(item: any){
    this.backofficeService.update(this.idItem, item).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item modificado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }}
    );
  }

  onSubmit(): void {
    if (this.ItemMenuForm.valid) {
      const formData = this.ItemMenuForm.value;
  
      // Verificar si el campo 'nombre' ha cambiado
      if (formData.nombre === this.data.nombre) {
        delete formData.nombre; // Si no ha cambiado, eliminar la propiedad del objeto
      }
  
      this.updateItem(formData);
      // No cierres el diálogo aquí ya que se cierra en updateItem en caso de éxito
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
