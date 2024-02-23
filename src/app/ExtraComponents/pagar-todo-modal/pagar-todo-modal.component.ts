import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { METODOSPAGO } from 'src/app/constants/metodosPago.constant';
import { Orden } from 'src/app/models/orden.model';
import { OrdenService, pagarTodoResponse, responseInfoPagos } from 'src/app/services/orden/orden.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pagar-todo-modal',
  templateUrl: './pagar-todo-modal.component.html',
  styleUrls: ['./pagar-todo-modal.component.scss']
})
export class PagarTodoModalComponent implements OnInit{

  ordenesInfo!: responseInfoPagos;
  currentDate = new Date();
  displayedColumns: string[] = ['ordenId', 'totalOrden', 'totalPagado', 'restaPagar'];
  metodoPago: string = METODOSPAGO.EFECTIVO;


  metodosPago = [
    { value: METODOSPAGO.EFECTIVO, viewValue: METODOSPAGO.EFECTIVO },
    { value: METODOSPAGO.TRANSFERENCIA, viewValue: METODOSPAGO.TRANSFERENCIA },
    { value: METODOSPAGO.CREDITO, viewValue: METODOSPAGO.CREDITO}
    // Puedes seguir añadiendo más métodos de pago si es necesario
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: Orden[], private ordenesService: OrdenService, private toastService:ToastService, private dialogRef: MatDialogRef<PagarTodoModalComponent>) { }

  ngOnInit(): void {
    this.getInfoPagosGeneral();
  }

  getInfoPagosGeneral(): void {
     // Convertir el objeto 'this.data' en un arreglo
     const ordenesArray = Object.values(this.data);
     console.log(ordenesArray)

     // Ahora puedes usar forEach sobre 'ordenesArray'
     let ordenesId: number[] = [];
     ordenesArray.forEach(orden => {
       ordenesId.push(orden.id);
     });

     

     console.log(ordenesId);
 
     //Le pegamos a ordenesService.getInfoPagos
     this.ordenesService.getInfoPagos(ordenesId).subscribe({
       next: (response: any) => {
         this.ordenesInfo = response;
         console.log(response);
       },
       error: (error) => {
         console.error('Hubo un error al obtener las órdenes', error);
       }
     });
  }

  pagarTodo(): void {
    // Convertir el objeto 'this.data' en un arreglo
    const ordenesArray = Object.values(this.data);
    console.log(ordenesArray)

    let ordenesSinPagar: number[] = [];
      ordenesArray.forEach(orden => {
        if(orden.paga == false){
          ordenesSinPagar.push(orden.id);
        }
      });

      /*
      Debemos armar la request:
      export interface pagarTodoRequest{
        ordenes: number[];
        metodoPago: string;
        cajaId: number;
        empleadoId: number;
      }
 */
      const request = {
        ordenes: ordenesSinPagar,
        metodoPago: this.metodoPago,
        cajaId: 1,
        empleadoId: JSON.parse(localStorage.getItem('empleadoId') || '{}'),
      }

      console.log(request);

      this.ordenesService.pagarTodo(request).subscribe({
        next: (response: pagarTodoResponse) => {
          this.toastService.showSuccess("Ordenes pagadas con éxito"); 
          
          console.log(response);

          // Cerrar el modal
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Hubo un error al obtener las órdenes', error);
        }
      });

  }

}
