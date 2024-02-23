import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstadisticasService, ItemInventario, LogEntry } from 'src/app/services/estadisticas/estadisticas.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-estadisticas-barra',
  templateUrl: './estadisticas-barra.component.html',
  styleUrls: ['./estadisticas-barra.component.scss']
})
export class EstadisticasBarraComponent {

  selectedDrink!:number;
  drinksList: ItemInventario[] = []; // Esta variable almacenará la lista de bebidas
  dataSource = new MatTableDataSource<LogEntry>();
  
  displayedColumns: string[] = ['horaAbierto', 'horaCerrado', 'cantTragos'];

  constructor(private estadisticasService: EstadisticasService,
    private toastService:ToastService) {}

  ngOnInit(): void {
    this.estadisticasService.getItemsInventarioTrago(false).subscribe({
      next: (response) => {
        this.drinksList = response.items;
        console.log(this.drinksList);
      },
      error: (error) => {
        console.error('Error fetching drinks:', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }
  onDrinkSelect(): void {
    if (this.selectedDrink) {
      this.estadisticasService.getLogsPorItem(this.selectedDrink).subscribe({
        next: (response) => {
          // Asignar los datos al dataSource de la tabla
          this.dataSource.data = response.rows;
        },
        error: (error) => {
          this.toastService.showError('Error al cargar los logs de la bebida');
          console.error('Error fetching logs:', error);
        }
      });
    }
  }
}
