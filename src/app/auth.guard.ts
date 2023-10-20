import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && tokenExpiration) {
      const now = new Date().getTime();
      if (now < parseInt(tokenExpiration, 10)) {
        // Token válido, permita o acesso à rota
        return true;
      }
    }

    // Token expirado ou ausente, redirecione para a página de login
    return this.router.parseUrl('/home');
  }
}
