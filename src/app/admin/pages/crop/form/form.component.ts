import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { WeatherService } from 'src/app/core/services/weather.service';
import { TextureService } from 'src/app/core/services/texture.service';
import { CropService } from 'src/app/core/services/crop.service';
import { Crop } from 'src/app/common/models/crop.model';
import { Weather } from 'src/app/common/models/weather.model';
import { Subscription } from 'rxjs';
import { Texture } from 'src/app/common/models/texture.model';

@Component({
  selector: 'crop-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class CropFormComponent implements OnInit, OnDestroy {

  nameClass = "CropFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  weathers: Weather[] = [];
  weathersSubs = new Subscription();
  textures: Texture[] = [];
  texturesSubs = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CropFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private textureService: TextureService,
    private cropService: CropService,
    private weatherService: WeatherService,
  ) {
    this.weathers = this.weatherService.Items;
    this.textures = this.textureService.Items;
    this.Form();
    this.weathersSubs = this.weatherService.itemsChanged.subscribe(
      (newItems) => {
        console.log('Weather', newItems);
        this.weathers = newItems;
      }
    );
    this.texturesSubs = this.textureService.itemsChanged.subscribe(
      (newItems) => {
        console.log('texture', newItems);
        this.textures = newItems;
      }
    );
  }

  async ngOnInit() {
    try {
      await this.weatherService.List();
      
      await this.textureService.List();
      
    } catch (err) {
      console.log(err);
    }
    
  }

  ngOnDestroy() {
    this.weathersSubs.unsubscribe();
    this.texturesSubs.unsubscribe();
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.noWhiteSpace.Validator
      ]),
      scientificName: new FormControl( this.data ? this.data.scientificName :  null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      phSince: new FormControl( this.data ? this.data.phSince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      phUntil: new FormControl( this.data ? this.data.phUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      temperatureSince: new FormControl( this.data ? this.data.temperatureSince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      temperatureUntil: new FormControl( this.data ? this.data.temperatureUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      altitudeSince: new FormControl( this.data ? this.data.altitudeSince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      altitudeUntil: new FormControl( this.data ? this.data.altitudeUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      hoursSince: new FormControl( this.data ? this.data.hoursSince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      hoursUntil: new FormControl( this.data ? this.data.hoursUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      typographySince: new FormControl( this.data ? this.data.typographySince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      typographyUntil: new FormControl( this.data ? this.data.typographyUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      humiditySince: new FormControl( this.data ? this.data.humiditySince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      humidityUntil: new FormControl( this.data ? this.data.humidityUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      conductivitySince: new FormControl( this.data ? this.data.conductivitySince :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      conductivityUntil: new FormControl( this.data ? this.data.conductivityUntil :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      organicMaterialMinPercentage: new FormControl( this.data ? this.data.organicMaterialMinPercentage :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      organicMaterialMaxPercentage: new FormControl( this.data ? this.data.organicMaterialMaxPercentage :  null, [
        Validators.required,
        // Validators.minLength(4),
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      weatherId: new FormControl( this.data ? this.data.weatherId :  null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      texturesId: new FormControl( this.data ? this.data.texturesId :  null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      
    });

  }

  async OnSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.data) {
        try {
          const registrytUpd = new Crop(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.cropService.Update(registrytUpd)) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
          if (await this.cropService.Create(
            new Crop(this.form.value)
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
