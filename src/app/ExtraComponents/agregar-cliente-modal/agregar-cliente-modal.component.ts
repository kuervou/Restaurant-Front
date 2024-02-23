import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.scss']
})
export class AgregarClienteModalComponent {
  ClienteForm!: FormGroup; // No es necesario inicializarlo aquí

  constructor(
    public dialogRef: MatDialogRef<AgregarClienteModalComponent>,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.ClienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  createCliente(cliente: any){
    this.clienteService.create(cliente).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item creado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
        
      }}
    );
  }

  onSubmit(): void {
    if (this.ClienteForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.ClienteForm.value;

      console.log(formData);

      this.createCliente(formData);

      this.dialogRef.close();
    }
  }

  onCancel(): void {
    // Cancelar y cerrar el modal sin retornar datos
    this.dialogRef.close();
  }
}
