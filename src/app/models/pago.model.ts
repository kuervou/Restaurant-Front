export interface Pago {
    id: number;
    fecha: string;
    hora: string;
    metodoPago: string;
    total: number;
    empleadoId: number;
    cajaId: number;
    ordenId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }