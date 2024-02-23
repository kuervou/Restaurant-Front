import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado-modal.component.html',
  styleUrls: ['./editar-empleado-modal.component.scss']
})
export class EditarEmpleadoModalComponent {
  roles: string[] = ['Admin', 'Mozo', 'Cocina'];
  EmpleadoForm!: FormGroup; // No es necesario inicializarlo aquí
  idEmpleado: number = this.empleado.id;

  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public empleado: Empleado,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private toastService: ToastService,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.EmpleadoForm = this.formBuilder.group({
      nombre: [this.empleado.nombre],
      apellido: [this.empleado.apellido],
      telefono: [this.empleado.telefono],
      rol: [this.empleado.rol]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateEmpleado(empleado: any){
    this.empleadoService.update(this.idEmpleado, empleado).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Empleado modificado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }}
    );
  }

  onSubmit() {
    if (this.EmpleadoForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.EmpleadoForm.value;

      this.updateEmpleado(formData);

      this.dialogRef.close();
    }
  }
}
