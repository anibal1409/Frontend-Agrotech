import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { RoutesAdmin } from 'src/app/common/enum/routes/routes-admin.enum';
import { RoutesCommunity } from 'src/app/common/enum/routes/routes-community.enum';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  visibility = false;

  routeForgotPassword = RoutesLogin.FORGOT_PASSWORD;
  routeSignUp = RoutesLogin.SIGN_UP;
  inputAppearance: string = textFieldAppearance;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
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
      password: new FormControl( null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          this.noWhiteSpace.Validator
        ]),
    });

  }

  OnSubmit() {
    if (this.form.valid) {
      this.Login();
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

  async Login() {
    try {
      const response = await this.authService.SignIn(this.form.value);
      if (response) {
        this.snackBarService.Success('Login exitoso.');
        setTimeout(
          () => {
            if(response.user && response.user.role) {
              switch (response.user.role) {
                case 'admin': 
                this.router.navigate([RoutesAdmin.HOME]);
                break;
                case 'basic': 
                this.router.navigate([RoutesCommunity.HOME]);
                break;
              }
            }
            
          }, 3000);
      }
    } catch (error) {

    }
  }

  ChangeVisibility() {
    this.visibility = !this.visibility;
  }

}
