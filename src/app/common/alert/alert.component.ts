import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertData, AlertType, AlertButtons, AlertInputs, maxStatus, AlertButton } from './base';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  listInputs: any[] = [];
  maxStatus = maxStatus;
  valueRange = 1;

  public options: { [key: string]: any } = null;

  public alertType: AlertType = null;

  private stepIndex = 0;
  

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData) {
      this.options = this.data.option;
      this.alertType = this.data.alertType;
    }

  ngOnInit() {
  }

  Close(value: AlertButton) {
    this.dialogRef.close(value.value);
  }

  public option<T>(key: string, DEFAULT = null): T {
    return this.options && this.options[key]
      ? this.options[key]
      : DEFAULT;
  }

  public get isConfirm(): boolean {
    return this.alertType === AlertType.Confirm;
  }

  public get isTutorial(): boolean {
    return this.alertType === AlertType.Tutorial;
  }

  public get isInputs(): boolean {
    return this.alertType === AlertType.Input;
  }

  public get isRange(): boolean {
    return this.alertType === AlertType.Range;
  }

  public get isPromptStatus(): boolean {
    return this.alertType === AlertType.PromptStatus;
  }

  public get isInput(): boolean {
    return this.description && this.description !== 'WINK.STATUS.BUSY' && this.description !== 'WINK.STATUS.AVAILABLE';
  }

  public get steps(): string[] {
    return this.option('steps');
  }

  public get step(): string {
    return this.steps[this.stepIndex];
  }

  public nextStep(): void {
    if (this.stepIndex === this.steps.length - 1) {
      // this.Close();
    } else {
      this.stepIndex++;
    }
  }

  // disabledButton(button: any) {
  //   let disabled = false;
  //   if (button && button.value && this.isPromptStatus && this.SelectRadioInput) {
  //     disabled = true;
  //   }
  //   return disabled;
  // }

  ValueRange(emit: any) {
    if (emit && emit.value) {
        // return this.range.value;
    }
    return null;
  }

  changeRange() {
    // this.valueRange = this.range.value as number;
  }

  // ValueInputs(emit: any) {
  //   const value: string[] = [];
  //   let ready = false;
  //   if (emit && emit.value) {
  //     this.listInputs.push(...(this.checkboxs as any)._results);
  //     if (this.listInputs.length > 0) {
  //       this.listInputs.forEach(
  //         (input: any, index: number) => {
  //           if (input.checked) {
  //             value.push(input.value);
  //           }
  //           if (index === (this.listInputs.length - 1)) {
  //             ready = true;
  //           }
  //         }
  //       );
  //     } else {
  //       return null;
  //     }
  //     if (ready) {
  //       console.log(value);
  //       return value;
  //     }
  //   } else {
  //     return emit;
  //   }
  // }

  public get title(): string {
    return this.option('title');
  }

  public get description(): string {
    return this.option('description');
  }

  public get buttons() {
    return this.option<AlertButtons>('buttons', []);
  }

  public get inputs() {
    return this.option<AlertInputs>('inputs', []);
  }

  public get max() {
    return this.option('max');
  }

  public get min() {
    return this.option('min');
  }

  public get value() {
    return this.option('value');
  }

}
