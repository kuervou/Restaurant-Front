import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteResponse, ClienteService } from 'src/app/services/cliente/cliente.service';
import { EstadisticasService } from 'src/app/services/estadisticas/estadisticas.service';

@Component({
  selector: 'app-estadisticas-clientes',
  templateUrl: './estadisticas-clientes.component.html',
  styleUrls: ['./estadisticas-clientes.component.scss']
})
export class EstadisticasClientesComponent {

  selectedFilter!: string;
  selectedValue!: string;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = []; // Puedes llenarlo dinámicamente con los años que desees.
  currentOptions: (string | number)[] = [];
  clientesPreferenciales: ClienteResponse[] = [];
  selectedDate: Date = new Date();
  consumoTotalEfectivo!: number;
  topClientes!: any[];
  selectedClient!: number;
  clientConsumption!: number;  // Para almacenar el consumo del cliente seleccionado
  
  constructor(private estadisticasService: EstadisticasService, private clienteService: ClienteService, private router: Router) {
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
    this.cargarClientes();
    this.updateSecondSelect(this.selectedFilter);
    this.fetchConsumoClientes(); // Llama a la función después de inicializar el filtro
    this.fetchTopClientes();
  }

  cargarClientes(): void {
    this.clienteService.getAllClientesByLimit().subscribe({
      next: (response) => {
        this.clientesPreferenciales = response.items;
      },
      error: (error) => {
        console.error('Error al cargar los clientes:', error);
      }
    });
  }

  onClientChange(event: any) {
    this.selectedClient = event.value;
    this.fetchClienteConsumo(this.selectedClient);
  }

  fetchClienteConsumo(clienteId: number) {
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
  
    this.estadisticasService.getConsumoPorClienteId(clienteId, filterType, filterValue).subscribe({
      next: (data) => {
        this.clientConsumption = data; // Asumiendo que la respuesta tiene un campo 'totalConsumo'
        // Realizar las actualizaciones necesarias en la vista, si es necesario
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchConsumoClientes() {
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

    this.estadisticasService.getConsumoClientesEstadisticas(filterType, filterValue).subscribe({
      next: (data) => {
        this.consumoTotalEfectivo = data; // Asumiendo que la respuesta tiene un campo `cantidad`
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchTopClientes() {
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
      this.estadisticasService.getTopClientes(filterType, filterValue).subscribe({
        next: (data) => {
          this.topClientes = data;
        },
        error: (error) => {
          console.error('Error al cargar el top de clientes:', error);
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
    this.fetchConsumoClientes();
    this.fetchClienteConsumo(this.selectedClient);
    this.fetchTopClientes();
    
  }

  onSecondFilterChange(event: any) {
    this.selectedValue = event.value;
    this.fetchConsumoClientes();
    this.fetchClienteConsumo(this.selectedClient);
    this.fetchTopClientes();
    
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
  this.fetchConsumoClientes();
  this.fetchClienteConsumo(this.selectedClient);
  this.fetchTopClientes();
}

navigateTo(route: string) {
  this.router.navigate([route]);
}

}
