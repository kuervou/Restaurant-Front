import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Mesa } from 'src/app/models/mesa.model';
import { DataTransferService } from 'src/app/services/DataTransferService/data-transfer-service.service';
import {
  ClienteService,
  GetAllClientesResponse,
} from 'src/app/services/cliente/cliente.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import {
  GetAllMesasResponse,
  MesasResponse,
  MesasService,
} from 'src/app/services/mesas/mesas.service';
import { OrdenService } from 'src/app/services/orden/orden.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-orden-modal',
  templateUrl: './agregar-orden-modal.component.html',
  styleUrls: ['./agregar-orden-modal.component.scss'],
})
export class AgregarOrdenModalComponent {
  mesas: Mesa[] = [];
  OrdenForm!: FormGroup;
  pageEvent: PageEvent = { pageIndex: -1, pageSize: 10, length: 0 };
  clientes: any[] = [];
  ocupacionLocal: number = 50;

  ordenFormValues = {
    cantComensales: 0
  };

  constructor(
    public dialogRef: MatDialogRef<AgregarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private mesaService: MesasService,
    private clienteService: ClienteService,
    private dataTransferService: DataTransferService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getMesas();
    this.getClientes();

    this.OrdenForm = this.formBuilder.group({
      nroMesa: [[]],
      libre: [true],
      cantComensales: ['', Validators.required],
      clientePreferencial: [undefined],
      nombreCliente: [''],
    });

    this.OrdenForm.get('clientePreferencial')?.valueChanges.subscribe((value) => {
      if (value) {
        this.OrdenForm.get('nombreCliente')?.disable();
        this.OrdenForm.get('nombreCliente')?.setValue('');
      } else {
        this.OrdenForm.get('nombreCliente')?.enable();
      }
    });
  }

  validateCantComensales(value: number): void {
    if (value < 0) {
      this.ordenFormValues.cantComensales = 0;
    } else if (value > this.ocupacionLocal) {
      this.ordenFormValues.cantComensales = this.ocupacionLocal;
    }
  }

  getMesas() {
    this.mesaService.getAll().subscribe({
      next: (response: GetAllMesasResponse) => {
        if (Array.isArray(response)) {
          const mesas: MesasResponse[] = response.map((mesa) => ({
            id: mesa.id,
            nroMesa: mesa.nroMesa,
            libre: mesa.libre,
            createdAt: mesa.createdAt,
            updatedAt: mesa.updatedAt,
            // Añade otras propiedades si es necesario
          }));
          this.mesas = mesas; // Asignar el resultado mapeado a la variable de categorías
        } else {
          console.error('La respuesta del servicio no es un array válido.');
        }
      },
      error: (error) => {
        catchError(this.errorHandler.handleError);
      },
    });
  }

  getClientes() {
    this.clienteService
      .getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize)
      .subscribe({
        next: (response: GetAllClientesResponse) => {
          const clientesFromResponse = response.items;
          const clientesToAdd = clientesFromResponse.map((cliente) => ({
            id: cliente.id,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            cuenta: cliente.cuenta,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
            // Añade otras propiedades si es necesario
          }));

          this.clientes = [];
          this.clientes = [...this.clientes, ...clientesToAdd];
        },
        error: (error) => {
          catchError(this.errorHandler.handleError);
        },
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.OrdenForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.OrdenForm.value;
      this.dataTransferService.setOrdenData(formData); // Aquí estamos enviando los datos

      this.dialogRef.close();
      this.navigateTo('menumozo');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
