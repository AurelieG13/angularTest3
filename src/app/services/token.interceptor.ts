import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  excludedRoutes: string[] = ['/login','/home','/contact'];

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifie si l'URL de la requête est dans la liste des routes exclues

    if (this.isExcludedRoute(request.url)) {
      return next.handle(request); // Passe la requête au gestionnaire HTTP suivant sans modification
    }

     // Récupère le token JWT à partir du service AuthService
    return this.authService.getToken().pipe(
      switchMap(jwt => {
          // Vérifie si le token JWT est disponible avant de l'ajouter à l'en-tête de la requête
          if (jwt) {
              const reqWithToken = request.clone({
                  setHeaders: { Authorization: "Bearer " + jwt }
              });
              return next.handle(reqWithToken);
          } else {
              // Si aucun token n'est disponible, passe la requête au gestionnaire HTTP suivant sans modification
              return next.handle(request);

          }
      })
  );
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(route => url.includes(route));
  }
}
