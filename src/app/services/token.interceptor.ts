import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const toExlcude = "/login";
    if (request.url.search(toExlcude) === -1) {
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone( {
      setHeaders: { Authorization : "Bearer "+jwt}
      })
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}
