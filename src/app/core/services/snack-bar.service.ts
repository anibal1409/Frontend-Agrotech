import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }


  Success(message: string, action?: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, 
      config ? config :
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'background-success',
      }
    );
  }

  Danger(message: string, action?: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, 
      config ? config :
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'background-danger',
      }
    );
  }

  Wanring(message: string, action?: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, 
      config ? config :
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'background-warning',
      }
    );
  }

  Info(message: string, action?: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, 
      config ? config :
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'background-info',
      }
    );
  }


}
