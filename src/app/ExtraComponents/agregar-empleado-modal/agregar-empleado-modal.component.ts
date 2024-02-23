import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado-modal.component.html',
  styleUrls: ['./agregar-empleado-modal.component.scss']
})
export class AgregarEmpleadoModalComponent {
  EmpleadoForm!: FormGroup; // No es necesario inicializarlo aquí

  empleado: Empleado = {
    id: 0, // Esto es solo un valor por defecto. Debes manejar cómo asignar un ID adecuadamente.
    nombre: '',
    apellido: '',
    telefono: '',
    nick: '',
    password: '',
    rol: '',
    activo: true
  };

  roles: string[] = ['Admin', 'Mozo', 'Cocina'];

  constructor(
    public dialogRef: MatDialogRef<AgregarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private toastService: ToastService) {}

  ngOnInit(): void {
    this.EmpleadoForm = this.formBuilder.group({
      nick: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  createEmpleado(empleado : any){
    this.empleadoService.create(empleado).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item creado con exito");
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

      this.createEmpleado(formData);

      this.dialogRef.close();
    }
  }

  onCancel(): void {
    // Cancelar y cerrar el modal sin retornar datos
    this.dialogRef.close();
  }
}
