import { Time } from "@angular/common";

export interface Movimiento{
    id:number;
    fecha: Date;
    hora: string;
    tipo: string;
    observacion:string;
    total:number;
    nroOrden:number;
}