import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { ModificarItemModalComponent } from '../../modificar-item-modal/modificar-item-modal.component';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Mesa } from 'src/app/models/mesa.model';

@Component({
  selector: 'app-modificar-mesa-modal',
  templateUrl: './modificar-mesa-modal.component.html',
  styleUrls: ['./modificar-mesa-modal.component.scss']
})
export class ModificarMesaModalComponent {
  MesaForm!: FormGroup; // No es necesario inicializarlo aquí
  idMesa: number = this.mesa.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemModalComponent>,
    private mesaService: MesasService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public mesa: Mesa) { }

    ngOnInit(): void {
  
      this.MesaForm = this.formBuilder.group({
        nroMesa: [this.mesa.nroMesa],
        libre: [this.mesa.libre]
      });
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    updateCategoria(item: any){
      this.mesaService.updateMesa(this.idMesa, item).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item modificado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
        }}
      );
    }

    onSubmit() {
      if (this.MesaForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.MesaForm.value;

        this.updateCategoria(formData);
  
        this.dialogRef.close();
      }
    }
}
