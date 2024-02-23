import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-mesa-modal',
  templateUrl: './agregar-mesa-modal.component.html',
  styleUrls: ['./agregar-mesa-modal.component.scss']
})
export class AgregarMesaModalComponent {
  MesaForm!: FormGroup; // No es necesario inicializarlo aquí

  constructor(
    public dialogRef: MatDialogRef<AgregarMesaModalComponent>,
    private formBuilder: FormBuilder,
    private mesaService: MesasService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.MesaForm = this.formBuilder.group({
        nroMesa: ['', Validators.required],
        libre: [true]
      });
    }

    createMesa(mesa: any){
      this.mesaService.create(mesa).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item creado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
          
        }}
      );
    }

    onSubmit(): void {
      if (this.MesaForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.MesaForm.value;
  
        this.createMesa(formData);
  
        this.dialogRef.close();
      }
    }

    onCancel(): void {
      // Cancelar y cerrar el modal sin retornar datos
      this.dialogRef.close();
    }
}

