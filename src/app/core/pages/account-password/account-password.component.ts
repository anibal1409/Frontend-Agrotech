import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { SnackBarService } from '../../services/snack-bar.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})
export class AccountPasswordComponent implements OnInit {

  nameClass = "AccountPasswordComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  visibility = false;
  visibilityConfirm = false;
  private uuid: string;
  inputAppearance: string = textFieldAppearance;


  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<AccountPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
  ) {
    this.Form();
  }

  ngOnInit() {
    
  }

  private Form() {
    this.form = this.formBuilder.group({
      password: new FormControl( '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.noWhiteSpace.Validator
      ]),
      confirm: new FormControl( '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirm) {
      if (await this.accountService.ChangePassword(this.form.value.password)) {
        this.Close();
      }
    } else {

    }
  }

  MessageError(input: string) {
    if (this.form.controls[input] && this.form.controls[input].errors && this.form.controls[input].touched) {
      const obj = this.form.controls[input].errors;
      let prop;
      Object.keys(obj).forEach(
        (key) => {
          prop = key;
        }
      );
      if (prop) {
        switch (prop) {
          case 'required':
            return MessageErrorForms.REQUIRED;
          case 'email':
            return MessageErrorForms.EMAIL;
          case 'minlength':
            return MessageErrorForms.MINIMUM;
          case 'maxlength':
            return MessageErrorForms.MAXIMUM;
          case 'pattern':
            return MessageErrorForms.CHARACTER;
          case 'whitespace':
            return MessageErrorForms.WHITE_SPACE;
        }
      }
    }
  }

  ChangeVisibility() {
    this.visibility = !this.visibility;
  }

  ChangeVisibilityConfirm() {
    this.visibilityConfirm = !this.visibilityConfirm;
  }

  ValidForm(): boolean {
    if (this.form.invalid) {
      return true;
    }
    
    return this.form.value.password !== this.form.value.confirm;
  }

  Close() {
    this.dialogRef.close();
  }

}
