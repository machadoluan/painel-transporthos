import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAuthenticated: boolean | undefined;

  login(username: string, password: string): void {
    // Aqui, você verifica as credenciais e autentica o usuário
    if (username === 'operacional' && password === '10203040') {
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
