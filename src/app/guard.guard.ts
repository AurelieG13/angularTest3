import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true; // Autoriser l'accès à la route si l'utilisateur est connecté
        } else {
          this.router.navigate(['/login'], { queryParams: { message: 'Vous devez être connecté pour accéder à cette page'}}); // Rediriger l'utilisateur vers la page de connexion
          return false; // Interdire l'accès à la route
        }
      })
    );
  }
}
