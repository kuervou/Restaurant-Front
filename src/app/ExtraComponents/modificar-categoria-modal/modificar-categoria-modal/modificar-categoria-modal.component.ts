import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModificarItemModalComponent } from '../../modificar-item-modal/modificar-item-modal.component';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-modificar-categoria-modal',
  templateUrl: './modificar-categoria-modal.component.html',
  styleUrls: ['./modificar-categoria-modal.component.scss']
})
export class ModificarCategoriaModalComponent {
  CategoriaForm!: FormGroup; // No es necesario inicializarlo aquí
  idCategoria: number = this.categoria.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemModalComponent>,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria) { }

    ngOnInit(): void {
  
      this.CategoriaForm = this.formBuilder.group({
        nombre: [this.categoria.nombre],
      });
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    updateCategoria(item: any){
      this.categoriaService.update(this.idCategoria, item).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item modificado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
        }}
      );
    }

    onSubmit() {
      if (this.CategoriaForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.CategoriaForm.value;

        this.updateCategoria(formData);
  
        this.dialogRef.close();
      }
    }

}
