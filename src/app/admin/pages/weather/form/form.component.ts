import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Weather } from 'src/app/common/models/weather.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WeatherFormComponent>,
    private weatherService: WeatherService,
    private toast: SnackBarService
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
    try {
      if (this.form.valid) {
        if (this.data) {
          const registrytUpd = new Weather(this.form.value);
          registrytUpd._id = this.data._id;
          await this.weatherService.Update(registrytUpd);
          this.toast.Success('Clima actualizado exitosamente');
          this.Close();
        } else {
          await this.weatherService.Create( new Weather(this.form.value));
          this.toast.Success('Clima creado exitosamente');
          this.Close();
        }
      }
    } catch (error) {
      if (error.error.errorBag && error.error.errorBag === 'Name already registered') {
        this.toast.Danger('Ya existe un clima registrado con ese nombre');
        this.Close();
      } else if (error.error.error && error.error.error === 'Name already registered') {
        this.toast.Danger('Ya existe un clima registrado con ese nombre');
        this.Close();
      } else {
        this.toast.Danger('Algo salio mal');
        this.Close();
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
