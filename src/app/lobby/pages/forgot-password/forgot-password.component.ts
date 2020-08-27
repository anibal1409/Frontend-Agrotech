import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  visibility = false;
  inputAppearance: string = textFieldAppearance;

  routeSignIn = RoutesLogin.SIGN_IN;
  routeSignUp = RoutesLogin.SIGN_UP;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {
    this.Form();
  }

  ngOnInit() {
  }

  private Form() {
    this.form = this.formBuilder.group({
      email: new FormControl( null,  [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
      try {
        await this.authService.ForgotPassword(this.form.value.email);
        this.snackBarService.Success(
          'Ha sido enviado un correo a ' +
            this.form.value.email +
            ' con las instrucciones para cambiar su contraseña.'
        );
        this.router.navigate([RoutesLogin.SIGN_IN]);
      } catch (error) {
      }
    }

  }

  MessageError(input: string) {
    const control = this.form.get(input);
    const { dirty, pristine, errors, touched } = control;
    if (dirty && touched && !pristine) {
      // return errors;
      let prop;
      Object.keys(errors).forEach(
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

    return null;
    // if (this.form.controls[input] && this.form.controls[input].errors && this.form.controls[input].touched) {
    //   const obj = this.form.controls[input].errors;
    //   let prop;
    //   Object.keys(obj).forEach(
    //     (key) => {
    //       prop = key;
    //     }
    //   );
    //   if (prop) {
    //     switch (prop) {
    //       case 'required':
    //         return MessageErrorForms.REQUIRED;
    //       case 'email':
    //         return MessageErrorForms.EMAIL;
    //       case 'minlength':
    //         return MessageErrorForms.MINIMUM;
    //       case 'maxlength':
    //         return MessageErrorForms.MAXIMUM;
    //       case 'pattern':
    //         return MessageErrorForms.CHARACTER;
    //       case 'whitespace':
    //         return MessageErrorForms.WHITE_SPACE;
    //     }
    //   }
    // }
  }

}
