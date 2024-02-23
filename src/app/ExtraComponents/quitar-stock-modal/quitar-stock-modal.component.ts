import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-quitar-stock-modal',
  templateUrl: './quitar-stock-modal.component.html',
  styleUrls: ['./quitar-stock-modal.component.scss']
})
export class QuitarStockModalComponent implements OnInit {
  item: Item;
  currentStock: number;

  constructor(
    public dialogRef: MatDialogRef<QuitarStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService: InventarioService,
    private toastService: ToastService
  ) {
    this.item = data.item;
    this.currentStock = 0;
  }

  ngOnInit(): void {}

  decreaseStock() {
    if (this.currentStock > 0) {
      this.currentStock--;
    }
  }

  updateStock(id:number, amount:any){
    const stockData = { amount: -amount };
    this.inventarioService.updateStock(id, stockData).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Stock reducido con exito");
        this.dialogRef.close();
      },
      error:(error) => {
        
      }
  });
  }

  increaseStock() {
    if (this.currentStock < this.item.stock) {
      this.currentStock++;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  confirm() {
    // Aquí podrías actualizar el stock en tu base de datos o servicio
    this.updateStock(this.item.id, this.currentStock);
    this.dialogRef.close(this.currentStock);
  }
}

