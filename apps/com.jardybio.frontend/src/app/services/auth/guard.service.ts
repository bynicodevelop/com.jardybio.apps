import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(_route: Route, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      if (state.url === '/auth/login') {
        this.router.navigate(['/']); // Ajoutez cette ligne pour effectuer la redirection
        return false;
      }
      return true; // Autorisez l'accès aux autres routes si l'utilisateur est authentifié
    } else {
      if (state.url !== '/auth/login') {
        this.router.navigate(['/auth/login']); // Ajoutez cette ligne pour effectuer la redirection
      }
      return state.url === '/auth/login'; // Autorisez l'accès à la page de connexion si l'utilisateur n'est pas authentifié
    }
  }
}
