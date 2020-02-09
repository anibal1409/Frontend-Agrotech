import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from './alert.component';
import { Observable } from 'rxjs';
import { AlertOption, AlertType, AlertActionsOption, AlertButton, AlertTutorialOption, AlertInputsOption, AlertButtons, AlertButtonType } from './base';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private dialogRef: MatDialogRef<AlertComponent>;

  constructor(
    public dialog: MatDialog,
  ) { }


  public showConfirm(option: AlertOption, width?: string): Observable<null | boolean> {
    return this.Open(AlertType.Confirm, option, width);
  }

  public showActions(option: AlertActionsOption, width?: string): Observable<null | AlertButton> {
    return this.Open(AlertType.Actions, option, width);
  }

  public showNotification(option: AlertActionsOption, width?: string): Observable<null> {
    return this.Open(AlertType.Actions, option, width);
  }

  private Open(
    alertType: AlertType,
    option: AlertOption | AlertActionsOption | AlertTutorialOption | AlertInputsOption
    , widthV?: string): Observable<null | any> {
    if (alertType === AlertType.Confirm) {
      const buttons = this.confirmBT;

      (option as any).buttons = buttons;
    }
    if (alertType === AlertType.Input || alertType === AlertType.Range) {
      const buttons = this.InputBT;

      (option as any).buttons = buttons;
    }
    this.dialogRef = this.dialog.open(AlertComponent, {
      width: widthV ? widthV : '20rem',
      data: {
        alertType,
        option,
      }
    });

    return this.dialogRef.afterClosed();
  }

  private get confirmBT(): AlertButtons {
    const A = 'Aceptar';
    const B = "Cancelar";

    return [
      { type: AlertButtonType.Gray, label: B, value: false },
      { type: AlertButtonType.Primary, label: A, value: true }
    ] as AlertButtons;
  }

  private get InputBT(): AlertButtons {
    const A = 'Aceptar';
    const B = "Cancelar";

    return [
      { type: AlertButtonType.Gray, label: B, value: false },
      { type: AlertButtonType.Primary, label: A, value: true }
    ] as AlertButtons;
  }




}
