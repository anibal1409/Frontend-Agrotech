import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from '../../../common/validators/no-whithe-space.validator';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  seePassword = false;
  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.Form();
  }

  ngOnInit() {
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( null,  [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.noWhiteSpace.Validator
      ]),
      email: new FormControl( null,  [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.noWhiteSpace.Validator
      ]),
      password: new FormControl( null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          this.noWhiteSpace.Validator
        ]),
    });

  }

  OnSubmit() {

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

}
