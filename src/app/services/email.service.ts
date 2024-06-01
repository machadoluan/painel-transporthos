// email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://backend-transporter.vercel.app';

  constructor(private http: HttpClient) { }

  sendEmail(emails: string[] = [], additionalData: any): Observable<any> {
    const body = { recipientEmail: emails, ...additionalData };
    return this.http.post(`${this.apiUrl}/send`, body);
  }
}