import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  visibility = false;
  visibilityConfirm = false;
  private uuid: string;
  inputAppearance: string = textFieldAppearance;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
  ) {
    this.Form();
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      async (params: Params) => {
        if (params.token) {
          this.uuid = params.token;
        } else {
          // redireccionar al login
        }
      }
    );
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
    if (!this.ValidForm()) {
      try {
        console.log('entro')
        if (await this.authService.ChangePassword(this.uuid, this.form.value.password)) {
          this.router.navigate([RoutesLogin.SIGN_IN]);
          this.snackBarService.Success('Contrasena modificada con exito.');
        }
      } catch (error) {
      }
    }
  }

  MessageError(input: string) {
    const control = this.form.get(input);
    const { dirty, pristine, errors, touched } = control;
    if (dirty && touched && !pristine && errors) {
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

  Login() {
    this.authService.SignIn(this.form.value);
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

}
