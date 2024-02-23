import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticasService } from 'src/app/services/estadisticas/estadisticas.service';

@Component({
  selector: 'app-estadisticas-generales',
  templateUrl: './estadisticas-generales.component.html',
  styleUrls: ['./estadisticas-generales.component.scss']
})
export class EstadisticasGeneralesComponent implements OnInit{

  selectedFilter!: string;
  selectedValue!: string;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = []; // Puedes llenarlo dinámicamente con los años que desees.
  currentOptions: (string | number)[] = [];

  selectedDate: Date = new Date();
  totalVentas!: number;
  ordenesProcesadas!: number;
  topCincoProductos!: any[];

  constructor(private estadisticasService: EstadisticasService, private router: Router) {
    const currentYear = new Date().getFullYear();
    for(let i = 0; i < 10; i++) {  // Añade 10 años al array, desde el año actual.
      this.years.push(currentYear - i);
    }
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i);
    }
    this.selectedFilter = 'mes';
    this.updateSecondSelect(this.selectedFilter);
    this.fetchEstadisticas(); // Llama a la función después de inicializar el filtro
    this.fetchOrdenesProcesadas();
    this.fetchTopCincoProductos();
  }

  // En estadisticas-generales.component.ts

  fetchEstadisticas() {
    let filterType = '';
    let filterValue = '';

    if (this.selectedFilter === 'mes') {
      filterType = 'mes';
      filterValue = this.getMonthNumber(this.selectedValue).toString().padStart(2, '0');
    } else if (this.selectedFilter === 'anio') {
      filterType = 'anio';
      filterValue = this.selectedValue;
    } else if (this.selectedFilter === 'dia') {
      filterType = 'dia';
      filterValue = this.formatDate(this.selectedDate);
    }

    this.estadisticasService.getVentasEstadisticas(filterType, filterValue).subscribe({
      next: (data) => {
        // Actualiza tus estadísticas aquí
        this.totalVentas = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchOrdenesProcesadas() {
    let filterType = '';
    let filterValue = '';

    if (this.selectedFilter === 'mes') {
      filterType = 'mes';
      filterValue = this.getMonthNumber(this.selectedValue).toString().padStart(2, '0');
    } else if (this.selectedFilter === 'anio') {
      filterType = 'anio';
      filterValue = this.selectedValue;
    } else if (this.selectedFilter === 'dia') {
      filterType = 'dia';
      filterValue = this.formatDate(this.selectedDate);
    }
    

    this.estadisticasService.getOrdenesProcesadasEstadisticas(filterType, filterValue).subscribe({
      next: (data) => {
        this.ordenesProcesadas = data; // Asumiendo que la respuesta tiene un campo `cantidad`
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchTopCincoProductos() {
    let filterType = '';
    let filterValue = '';
    
    if (this.selectedFilter === 'mes') {
      filterType = 'mes';
      filterValue = this.getMonthNumber(this.selectedValue).toString().padStart(2, '0');
    } else if (this.selectedFilter === 'anio') {
      filterType = 'anio';
      filterValue = this.selectedValue;
    } else if (this.selectedFilter === 'dia') {
      filterType = 'dia';
      filterValue = this.formatDate(this.selectedDate);
    }
    
    this.estadisticasService.getTopItemsMenu(filterType, filterValue).subscribe({
      next: (data) => {
        this.topCincoProductos = data;
      },
      error: (error) => {
        console.error('Error al cargar el top de productos:', error);
      }
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formato 'yyyy-mm-dd'
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.value;
    this.updateSecondSelect(this.selectedFilter);
    // Si el filtro es 'dia', inicializa selectedDate con la fecha actual
    if (this.selectedFilter === 'dia') {
      this.selectedDate = new Date();
    } else {
      this.selectedValue = this.currentOptions[0].toString();
    }
    this.fetchEstadisticas();
    this.fetchOrdenesProcesadas();
    this.fetchTopCincoProductos();
  }

  onSecondFilterChange(event: any) {
    this.selectedValue = event.value;
    this.fetchEstadisticas();
    this.fetchOrdenesProcesadas();
    this.fetchTopCincoProductos();
  }

getMonthNumber(monthName: string): number {
  return this.months.indexOf(monthName) + 1; // Asegúrate de que tu array 'months' esté en orden correcto
}

updateSecondSelect(value: string) {
  if (value === 'mes') {
    this.currentOptions = this.months;
    this.selectedValue = this.months[new Date().getMonth()]; // Establece el mes actual como valor predeterminado
  } else if (value === 'anio') {
    this.currentOptions = this.years.map(year => year.toString()); // Convertir a string si es necesario
    this.selectedValue = this.years[0].toString(); // Establece el primer año como valor predeterminado
  } else {
    this.currentOptions = [];
    this.selectedValue = '';
  }
  // Esto asegurará que el valor seleccionado se actualice en el segundo select.
  this.fetchEstadisticas();
  this.fetchOrdenesProcesadas();
  this.fetchTopCincoProductos();
}

navigateTo(route: string) {
  this.router.navigate([route]);
}
  
}
