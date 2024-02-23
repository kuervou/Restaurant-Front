import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMovimientoRequest, MovimientoService } from 'src/app/services/movimiento/movimiento.service';
import { MOVIMIENTOS } from 'src/app/constants/movimientos.constant';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ingresar-efectivo-modal',
  templateUrl: './ingresar-efectivo-modal.component.html',
  styleUrls: ['./ingresar-efectivo-modal.component.scss']
})
export class IngresarEfectivoModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<IngresarEfectivoModalComponent>
    ) {
    this.form = this.fb.group({
      monto: ['', [Validators.required, Validators.min(0)]], // asumí que el monto no puede ser negativo
      observacion: ['']
    });
  }

  onSubmit() {
    const ahora = new Date();

    const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
    
    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    const storedValue = localStorage.getItem('empleadoId');

    const empleadoId = storedValue ? +storedValue : 0; // O cualquier valor predeterminado que quieras usar en caso de que no exista.

    if (this.form.valid) {
      const data: CreateMovimientoRequest = {
        tipo: MOVIMIENTOS.INGRESO,
        total: this.form.get('monto')!.value,
        observacion: this.form.get('observacion')!.value,
        fecha: fecha,
        hora: hora,
        empleadoId: empleadoId,
        cajaId: 1 
      };

      this.movimientoService.post(data).subscribe({
        next:response => {
        console.log('Movimiento creado:', response);
        this.toastService.showSuccess("Ingreso realizado con éxito");
           // Cierra el modal
        this.dialogRef.close();

      }, 
        error:error => {
          console.log('Error al crear el movimiento:', error);
          this.toastService.showError("Error al realizar el ingreso");
      }});
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
