import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ChartDataset, Color } from 'chart.js';
import { EstadisticasService, EstadisticaHoraPico } from 'src/app/services/estadisticas/estadisticas.service';

interface OrdersMap {
  [key: string]: number;
}

interface DatesMap {
  [key: string]: number;
}


@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.scss']
})


export class EstadisticasVentasComponent implements OnInit {
  selectedView: string = 'Mensual';  // Por defecto
  selectedOption!: number;
  selectedDate!: Date;

  hora!: string;
  cantidadOrdenes!: number;
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ];

  years: number[] = [];

  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ventas', borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' }
  ];
  public lineChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChartLegend = true;
  public lineChartType: any = 'line';

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private estadisticasService: EstadisticasService, private router: Router) { }

  ngOnInit(): void {
    this.selectedDate = new Date(); 
    this.initializeYearsArray();
   }

   initializeYearsArray(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 20 }, (v, i) => currentYear - i);
  }

  updateView(view: string) {
    this.selectedView = view;
    if (view === 'Mensual' && this.selectedOption) {
      this.fetchIngresosMensuales(this.selectedOption);
    }
  }


  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value!;
    if (this.selectedDate) {
      const formattedDate = this.formatDate(this.selectedDate);
      // Llama a la función que obtiene los datos de horas pico
      this.fetchHorasPico(formattedDate);
    }
  }
  fetchHorasPico(date: string) {
    this.estadisticasService.getEstadisticasHorasPico(date).subscribe({
      next: (data) => {
        const hoursRange = this.generateHoursRange();
        // Inicializa un mapa para los datos con todos los intervalos a 0
        const ordersMap: OrdersMap = hoursRange.reduce((acc, hour) => {
          acc[hour] = 0;
          return acc;
        }, {} as OrdersMap); // Asignación de tipo correcta

        // Asigna la cantidad de órdenes a los intervalos más cercanos
        data.forEach(d => {
          const time = d.hora.slice(0, 5); // Obtiene la hora y minutos
          const closestInterval = this.findClosestInterval(time, hoursRange);
          if (closestInterval) {
            ordersMap[closestInterval] += d.cantidadOrdenes;
          }
        });

        // Convierte el mapa en arrays para el gráfico
        const chartData = Object.values(ordersMap);
        const chartLabels = Object.keys(ordersMap);

        // Actualiza los datos del gráfico
        this.lineChartData[0].data = chartData;
        this.lineChartLabels = chartLabels;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  findClosestInterval(time: string, range: string[]): string | undefined {
    // Convierte la hora y minutos a minutos desde medianoche para facilitar la comparación
    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minute;

    // Encuentra el intervalo más cercano
    const closest = range.reduce((prev, curr) => {
      const [currHour, currMinute] = curr.split(':').map(Number);
      const currInMinutes = currHour * 60 + currMinute;
      const prevDiff = Math.abs(timeInMinutes - (prev.hour * 60 + prev.minute));
      const currDiff = Math.abs(timeInMinutes - currInMinutes);
      return currDiff < prevDiff ? { hour: currHour, minute: currMinute, diff: currDiff } : prev;
    }, { hour: 0, minute: 0, diff: Infinity });

    return closest.diff !== Infinity ? closest.hour.toString().padStart(2, '0') + ':' + closest.minute.toString().padStart(2, '0') : undefined;
  }

  generateHoursRange(): string[] {
    const hoursRange: string[] = [];
    // Generar horas de 19:00 a 23:45
    for (let i = 19; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        hoursRange.push(`${hour}:${minute}`);
      }
    }
    // Generar horas de 00:00 a 06:45
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 60; j += 15) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        hoursRange.push(`${hour}:${minute}`);
      }
    }
    return hoursRange;
  }

  parseHour(hourString: string): number {
    // Extrae la hora de una cadena de tiempo 'HH:MM:SS' y la convierte a un número
    return parseInt(hourString.split(':')[0], 10);
  }

  private formatDate(date: Date): string {
    // Formatea la fecha como 'yyyy-MM-dd'
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-indexado
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Método que se llama cuando se selecciona un mes
  onMonthSelect(event: any): void {
    // Actualiza el gráfico basado en el mes seleccionado
    this.selectedOption = event.value;
    this.fetchIngresosMensuales(this.selectedOption);
  }

  fetchIngresosMensuales(mes: number): void {
    this.estadisticasService.getIngresoEnMes(mes).subscribe({
      next: (data) => {
        // Genera un rango de fechas para el mes seleccionado
        const datesRange = this.generateDatesRangeForMonth(this.selectedDate.getFullYear(), mes);
        // Aquí inicializamos datesMap con el tipo DatesMap correctamente
        const datesMap: DatesMap = datesRange.reduce((map: DatesMap, date) => {
          map[date] = 0; // Inicializa todos los días con 0 ingresos
          return map;
        }, {} as DatesMap); // Uso de 'as DatesMap' para casting
    
        // Mapea los datos a las fechas generadas
        data.forEach(d => {
          const day = d.fecha.split('T')[0]; // Asume que la fecha viene en formato ISO con 'T' como separador
          if (day in datesMap) {
            datesMap[day] = d.totalIngresos;
          }
        });
    
        const chartData = Object.values(datesMap);
        const chartLabels = Object.keys(datesMap);
    
        this.lineChartData[0].data = chartData;
        this.lineChartLabels = chartLabels;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  generateDatesRangeForMonth(year: number, month: number): string[] {
    const date = new Date(year, month - 1, 1);
    const dates = [];
  
    while (date.getMonth() === month - 1) {
      dates.push(new Date(date).toISOString().split('T')[0]); // Formato 'YYYY-MM-DD'
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }

  // Método que se llama cuando se selecciona un año
onYearSelect(event: any): void {
  // Actualiza el gráfico basado en el año seleccionado
  this.selectedOption = event.value;
  this.fetchIngresosAnuales(this.selectedOption);
}

fetchIngresosAnuales(anio: number): void {
  this.estadisticasService.getIngresoEnAnio(anio).subscribe({
    next: (data) => {
      // Transforma los datos para que correspondan a los meses del año
      const chartData = new Array(12).fill(0);
      const chartLabels = this.months.map(m => m.name);

      data.forEach(d => {
        chartData[d.mes - 1] = d.totalIngresos; // Resta 1 porque el array es 0-indexado y los meses son 1-indexados
      });

      this.lineChartData[0].data = chartData;
      this.lineChartLabels = chartLabels;
    },
    error: (error) => {
      console.error(error);
    }
  });
}

navigateTo(route: string) {
  this.router.navigate([route]);
}
}
