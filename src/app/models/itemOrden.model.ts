import { ItemMenu } from "./itemMenu.model";

export interface ItemOrden {
    id: number;
    ordenId: number;
    itemMenuId: number;
    cantidad: number;
    precio: number;
    createdAt: Date;
    updatedAt: Date;
    itemMenu: ItemMenu;
    
}