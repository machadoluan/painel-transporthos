import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://transporthos-painel-backend.onrender.com/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const body = { usuario: username, senha: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Exiba a data/hora de expiração do token
          const expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + 180000000); // Adapte para a expiração real do token (2 minutos)
          console.log('Token expira em:', expirationDate);
          localStorage.setItem('token', response.token);
          // Armazene a data/hora de expiração
          localStorage.setItem('tokenExpiration', expirationDate.toString());
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        if (error.status === 404) {
          return throwError('Credenciais incorretas. Tente novamente.');
        } else {
          return throwError('Erro ao efetuar o login. Tente novamente mais tarde.');
        }
      })
    );
  }
}
