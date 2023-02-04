import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private alert:AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // return un Obervable
    // next <=> laisse la requête continuer son chemin 
    // soit vers le prochain interceptor
    // soit vers le backend
    // tap permet de regarder à l'intérieur de la requête sans la modifier
    return next.handle(request)
    .pipe(
      tap({ 
        error: (err) => {
          console.log(err);
          if(err instanceof HttpErrorResponse) {
            switch(err.status) {
              case 400: this.alert.showAlert("erreur " + err.status + ": les identifiants sont invalides"); break;
              case 401: 
              this.alert.showAlert("erreur " + err.status + ": Vous n'êtes pas authentifiés");
                this.router.navigate(['/login']) 
                break;
              case 403: this.alert.showAlert("erreur " + err.status + ": Vous n'êtes pas autorisés"); break;
              case 404: this.alert.showAlert("erreur " + err.status + ": La ressource n'est pas disponible"); break;

              default: this.alert.showAlert("ERREUR SERVEUR");
            }
          }
        }
      })
    ) 
  }
}
