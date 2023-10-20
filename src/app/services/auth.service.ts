import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://transporthos-painel-backend.vercel.app/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const body = { usuario: username, senha: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Exibe a data/hora de expiração do token

          localStorage.setItem('token', response.token);
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

  isAuthenticated(): boolean {
    // Verifique se há um token no armazenamento local para determinar a autenticação.
    const token = localStorage.getItem('token');
    // Armazene a data/hora de expiração em algum lugar, por exemplo, no localStorage ou no estado da aplicação
    const expirationDate = new Date().getTime() + (60 * 60 * 1000); // Exemplo: 1 hora de validade
    localStorage.setItem('tokenExpiration', expirationDate.toString());
    return !!token; // Retorna verdadeiro se houver um token no armazenamento local.
  }

  // Adicione uma função para obter o token, caso você precise usá-lo para outras solicitações.
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}