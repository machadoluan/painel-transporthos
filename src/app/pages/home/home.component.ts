import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    this.authService.login(this.username, this.password).subscribe((loggedIn: boolean) => {
      console.log('Login Result:', loggedIn);
      if (loggedIn) {
        this.router.navigate(['/painel']);
      } else {
        this.error = 'Credenciais incorretas. Tente novamente.';
      }
    }, (error) => {
      this.error = error
    }
    );
  }
}
