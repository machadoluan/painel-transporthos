import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerarPdfService {

  private apiUrl = 'https://transporthos-painel-backend.onrender.com/enviar-pdf';

  constructor(private http: HttpClient) { }

  enviarPDF(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data);
  }
}
