import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Weather } from 'src/app/common/models/weather.model';

@Component({
  selector: 'weather-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class WeatherFormComponent implements OnInit {

  nameClass = "WeatherFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WeatherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private weatherService: WeatherService,
  ) {
    this.Form();
  }

  ngOnInit() {
  }

  private Form() {
    this.form = this.formBuilder.group({
      code: new FormControl( this.data ? this.data.code : null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.noWhiteSpace.Validator
      ]),
      modell: new FormControl( this.data ? this.data.modell :  null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      brand: new FormControl( this.data ? this.data.brand :  null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
      if (this.data) {
        try {
          const registrytUpd = new Weather(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.weatherService.Update(registrytUpd)) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
          if (await this.weatherService.Create(
            new Weather(this.form.value)
          )) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' create', error);
        }
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
