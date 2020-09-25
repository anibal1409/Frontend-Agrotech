import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { User } from 'src/app/common/models/user.model';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss']
})
export class AccountUserComponent implements OnInit {

  nameClass = "AccountUserComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private accountService: AccountService,
    private toast: SnackBarService,
  ) {
    this.Form();
  }

  ngOnInit() {
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
      try {
        if (await this.accountService.Update(this.form.value.name)) {
          this.toast.Success('Los datos fueron modificados con éxito.');
          this.Close();
        }
      } catch (err) {
        console.log(this.nameClass, 'Error OnSubmit', err);
      }
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

  Close() {
    this.dialogRef.close();
  }

}
