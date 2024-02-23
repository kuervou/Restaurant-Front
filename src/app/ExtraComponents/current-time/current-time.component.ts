import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: []
})
export class CurrentTimeComponent implements OnInit {
  currentTime!: string;

  constructor() { }

  ngOnInit(): void {
    this.updateTime(); // Llamar a la función para establecer la hora inicialmente

    // Actualizar la hora cada segundo
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    this.currentTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
