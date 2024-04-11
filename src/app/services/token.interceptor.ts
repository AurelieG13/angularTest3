import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  excludedRoutes: string[] = ['/login','/sports','/home','/contact'];

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifie si l'URL de la requête est dans la liste des routes exclues
    if (this.isExcludedRoute(request.url)) {
      return next.handle(request); // Passe la requête au gestionnaire HTTP suivant sans modification
    }
    // Ajoute le jeton JWT aux en-têtes de la requête pour les autres routes
    const jwt = this.authService.getToken();
    if (jwt) {
      const reqWithToken = request.clone({
        setHeaders: { Authorization: "Bearer "+jwt }
      });
      return next.handle(reqWithToken);
    } else {
      return next.handle(request); // Si aucun jeton n'est disponible, passe la requête au gestionnaire HTTP suivant sans modification
    }
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(route => url.includes(route));
  }
}
