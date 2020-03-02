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

  nameClass = 'UserFormComponent';

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toast: SnackBarService,
  ) {
    this.roles = this.userService.Roles;
  }

  ngOnInit() {
    this.Form();
  }

  private Form() {
    if (this.data) {
      this.form =  this.formBuilder.group({
        role: new FormControl( this.data.role, [
          Validators.required,
          this.noWhiteSpace.Validator
        ]),
      });
    } else {
      this.form = this.formBuilder.group({
        name: new FormControl( '', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          this.noWhiteSpace.Validator
        ]),
        email: new FormControl( '', [
          Validators.required,
          Validators.email,
          this.noWhiteSpace.Validator
        ]),
        role: new FormControl('', [
          Validators.required,
          this.noWhiteSpace.Validator
        ]),
      });
    }
  }

  async OnSubmit() {
    if (this.form.valid) {
        try {
            if (this.data) {
              await this.userService.ChangeRol(new User({_id: this.data._id, name: this.data.name, email: this.data.email, role: this.form.value.role}));
              this.toast.Success('usuario actualizado exitosamente');
            } else {
              await this.userService.Create(new User(this.form.value));
              this.toast.Success('usuario creado exitosamente');
            }
            this.Close();
        } catch (error) {
          this.toast.Danger(error);
          console.log(this.nameClass + ' create', error);
        }
    }
  }

  async deleteUser() {
    try {
      await this.userService.Delete(this.data);
      this.toast.Success('usuario eliminado exitosamente');
      this.Close();
  } catch (error) {
    this.toast.Danger(error);
    console.log(this.nameClass + ' create', error);
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
