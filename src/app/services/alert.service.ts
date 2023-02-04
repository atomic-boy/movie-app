import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar:MatSnackBar) { }

  showAlert(msg:string) {
    // va utiliser un composant Material SnackBar
    this.snackBar.open(msg, 'Fermer',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:5000
      }
    );

  }
}
