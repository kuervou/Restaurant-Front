import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grupo } from 'src/app/models/grupo.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modificar-grupo-modal',
  templateUrl: './modificar-grupo-modal.component.html',
  styleUrls: ['./modificar-grupo-modal.component.scss']
})
export class ModificarGrupoModalComponent {
  GrupoForm!: FormGroup;
  idGrupo: number = this.grupo.id;
  nombreOriginal: string = this.grupo.nombre;

  constructor(
    public dialogRef: MatDialogRef<ModificarGrupoModalComponent>,
    private grupoService: GrupoComidaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public grupo: Grupo) { }

  ngOnInit(): void {
    this.GrupoForm = this.formBuilder.group({
      nombre: [this.grupo.nombre],
      esBebida: [this.grupo.esBebida, Validators.required], // Suponiendo que 'esBebida' es una propiedad del grupo
      
    });
    console.log(this.GrupoForm);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateGrupo(grupo: any){
    // Ajustamos el valor de 'esBebida' para que sea un booleano antes de enviarlo
    grupo.esBebida = Boolean(Number(grupo.esBebida));

    this.grupoService.update(this.idGrupo, grupo).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Grupo modificado con éxito.");
        this.dialogRef.close(true); // Cerrar y retornar 'true' para indicar la actualización exitosa
      },
      error: (error) => {
        this.toastService.showError("Hubo un error al modificar el grupo.");
        this.errorHandler.handleError;
      }
    });
  }

  onSubmit() {
    if (this.GrupoForm.valid) {
      const formData = this.GrupoForm.value;
      
      // Verificar si el campo 'nombre' ha cambiado
      if (formData.nombre === this.nombreOriginal) {
        delete formData.nombre; // Si no ha cambiado, eliminar la propiedad del objeto
      }
      
      this.updateGrupo(formData);
    }
  }
}
