import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe((loggedIn: boolean) => {
      console.log('Login Result:', loggedIn);
      if (loggedIn) {
        this.toastr.success('Autenticado com sucesso.', 'Autenticado')
        this.router.navigate(['/painel']);
      } else {
        this.toastr.error('Credenciais incorretas. Tente novamente.', 'Ocorreu um erro');
      }
    }, (error) => {
      this.toastr.error(error, 'Ocorreu um erro')
    }
    );
  }
}
