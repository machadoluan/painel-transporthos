import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.username === 'operacional' && this.password === '10203040') {
      // Credenciais corretas, defina isAuthenticated como true
      this.authService.isAuthenticated = true;

      // Redirecione para a página 'painel' após o login
      this.router.navigate(['/painel']);
    } else {
      // Credenciais incorretas, exiba uma mensagem de erro
      this.error = 'Credenciais incorretas. Tente novamente.';
    }
  }
}








