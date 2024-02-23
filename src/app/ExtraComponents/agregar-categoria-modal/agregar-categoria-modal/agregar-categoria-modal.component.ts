import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-categoria-modal',
  templateUrl: './agregar-categoria-modal.component.html',
  styleUrls: ['./agregar-categoria-modal.component.scss']
})
export class AgregarCategoriaModalComponent {
  CategoriaForm!: FormGroup; // No es necesario inicializarlo aquí

  constructor(
    public dialogRef: MatDialogRef<AgregarCategoriaModalComponent>,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.CategoriaForm = this.formBuilder.group({
        nombre: ['', Validators.required],
      });
    }

    createCategoria(categoria: any){
      this.categoriaService.create(categoria).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item creado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
          
        }}
      );
    }

    onSubmit(): void {
      if (this.CategoriaForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.CategoriaForm.value;
  
        this.createCategoria(formData);
  
        this.dialogRef.close();
      }
    }

    onCancel(): void {
      // Cancelar y cerrar el modal sin retornar datos
      this.dialogRef.close();
    }

}
