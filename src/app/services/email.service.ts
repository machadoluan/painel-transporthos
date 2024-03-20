// email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendEmail(recipientEmail: string, additionalData: any, emailBody: string): Observable<any> {
    const body = { recipientEmail, ...additionalData, emailBody };
    return this.http.post(`${this.apiUrl}/send`, body);
  }
}
