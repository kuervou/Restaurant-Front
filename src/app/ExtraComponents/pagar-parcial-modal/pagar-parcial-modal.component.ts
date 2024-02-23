import { Component } from '@angular/core';

@Component({
  selector: 'app-pagar-parcial-modal',
  templateUrl: './pagar-parcial-modal.component.html',
  styleUrls: ['./pagar-parcial-modal.component.scss']
})
export class PagarParcialModalComponent {

  metodo = "efectivo";
  monto = "$500";

}
