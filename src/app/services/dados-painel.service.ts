import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosPainelService {
  selectedRow: any;

  constructor() { }
  setSelectedRow(row: any) {
    this.selectedRow = row;
  }

  getSelectedRow() {
    return this.selectedRow;
  }
}
