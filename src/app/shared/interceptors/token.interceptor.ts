import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let cloneRequest: any;
    let token = localStorage.getItem('token');
    console.log(request);

    if(request.url.includes('https://api-user-server.herokuapp.com/api/comments') && request.method == 'POST' && token != null) {
      // l'URL demande l'authentification donc il faut lui donner
      cloneRequest = request.headers.set('Authorization', 'Bearer '+token);


      // cloneRequest = request.clone({
      //   setHeaders: {
      //     Authorization: 'Bearer '+token
      //   }
      // });
      return next.handle(cloneRequest);
    }


    return next.handle(request);
  }
}
