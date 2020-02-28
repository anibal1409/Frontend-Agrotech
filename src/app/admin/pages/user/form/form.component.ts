import { Component, OnInit, Inject } from '@angular/core';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/common/models/user.model';
import { UserSignIn } from 'src/app/auth/models/user-sign-in.model';
import { IChangeRole } from 'src/app/common/interfaces/change-role.interface';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class UserFormComponent implements OnInit {

  nameClass = "UserFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  roles = []

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private snackBarService: SnackBarService,
  ) {
    this.roles = this.userService.Roles;
    this.Form();
  }

  ngOnInit() {
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( this.data ? {value: this.data.name, disabled: true} : null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.noWhiteSpace.Validator
      ]),
      email: new FormControl( this.data ? {value: this.data.email, disabled: true} :  null, [
        Validators.required,
        Validators.email,
        this.noWhiteSpace.Validator
      ]),
      role: new FormControl( this.data ? this.data.role :  'basic', [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
        try {
          if (this.data) {
            let myUser: IChangeRole = {rol : this.form.value.role, userId: this.data._id };
            if (await this.userService.Update(myUser)) {
              this.Close();
            }
          } else {
            if (await this.userService.Create(
              new UserSignIn(this.form.value)
            )) {
              this.snackBarService.Success('Usuario registrado con éxito. La contraseña temporal de este es 12345678.');
              this.Close();
            }
          }
        } catch (error) {
          console.log(this.nameClass + ' create', error);
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
