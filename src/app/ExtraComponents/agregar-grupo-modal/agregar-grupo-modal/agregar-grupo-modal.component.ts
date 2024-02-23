import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-grupo-modal',
  templateUrl: './agregar-grupo-modal.component.html',
  styleUrls: ['./agregar-grupo-modal.component.scss']
})
export class AgregarGrupoModalComponent {
    GrupoForm!: FormGroup; // No es necesario inicializarlo aquí

    constructor(
      public dialogRef: MatDialogRef<AgregarGrupoModalComponent>,
      private formBuilder: FormBuilder,
      private grupoService: GrupoComidaService,
      private toastService: ToastService,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.GrupoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        esBebida: ['', Validators.required],
      });
    }

    createGrupo(grupo: any){
      // Ajustamos el valor de 'esBebida' para que sea un booleano antes de enviarlo
      grupo.esBebida = Boolean(Number(grupo.esBebida));
      
      this.grupoService.create(grupo).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Grupo creado con éxito.");
          this.dialogRef.close(true); // Cerrar y retornar 'true' para indicar la creación exitosa
        },
        error:(error) => {
          this.toastService.showError("Hubo un error al crear el grupo.");
          console.error(error);
        }
      });
    }

    onSubmit(): void {
      if (this.GrupoForm.valid) {
        const formData = this.GrupoForm.value;
        this.createGrupo(formData);
      }
    }

    onCancel(): void {
      this.dialogRef.close();
    }
}
