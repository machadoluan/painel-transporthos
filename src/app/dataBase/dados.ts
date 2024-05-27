import { Data } from "@angular/router";

export interface Dado {
    data: Date;
    hora: Date;
    cliente: string
    qtd: number;
    peso: number;
    plCavalo: string;
    plCarreta: string;
    motorista: string;
    origem: string;
    destino: string;
    ajudantes: string;
    conferentes: string;
}
