import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item.model';
import { CompraService, CreateCompraRequest } from 'src/app/services/compra/compra.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-stock-modal',
  templateUrl: './agregar-stock-modal.component.html',
  styleUrls: ['./agregar-stock-modal.component.scss']
})
export class AgregarStockModalComponent implements OnInit {

  item: Item;
  currentStock: number;

  constructor(
    public dialogRef: MatDialogRef<AgregarStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compraService: CompraService,
    private toastService: ToastService
  ) {
    this.item = data.item;
    this.currentStock = 0;
  }

  ngOnInit(): void {}

  decreaseStock(): void {
    if (this.currentStock > this.item.stock) {
      this.currentStock--;
    }
  }

  increaseStock(): void {
    this.currentStock++;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateStock(id: number, amount: number) {
    const empleadoId = localStorage.getItem('empleadoId');
  
    if (!empleadoId) {
      this.toastService.showError('No se encontró el ID del empleado en la sesión');
      return;
    }
  
    const ahora = new Date();
    const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;
  
    // Objeto base para compraData
    const compraData: Partial<CreateCompraRequest> = {
      fecha: fecha,
      hora: hora,
      cantidad: amount,
      empleadoId: +empleadoId,
      itemInventarioId: id,
    };
  
    // Si cantidadxCasillero no es null, inclúyelo en el objeto compraData
    if (this.item.cantxCasillero != null) {
      compraData.cantidadxCasillero = this.item.cantxCasillero;
    }
  
    // Llama al servicio de compra con el objeto compraData
    this.compraService.create(compraData as CreateCompraRequest).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Compra registrada y stock actualizado con éxito");
        this.dialogRef.close();
      },
      error: (error) => {
        this.toastService.showError("Hubo un error al registrar la compra");
      }
    });
  }
  

  confirm(): void {
    // Aquí puedes implementar lógica adicional si es necesario
    this.updateStock(this.item.id, this.currentStock);
    this.dialogRef.close();
  }
}
