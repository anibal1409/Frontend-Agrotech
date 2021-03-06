import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { SectorService } from 'src/app/core/services/sector.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sector } from 'src/app/common/models/sector.model';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Weather } from 'src/app/common/models/weather.model';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/common/models/month.model';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';


enum SectorType {
  HUMIDITY = '0',
  TEMPERATURE = '1',
  LIGHT = '2',
}

@Component({
  selector: 'sector-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class SectorWizardComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  months: Month[] = [];

  nameClass = 'SectorWizardComponent';
  lightName = 'light';
  temperatureName = 'temperature';
  humidityName = 'humidity';

  formSector: FormGroup;
  formSectorHumidity: FormGroup;
  formSectorTemperature: FormGroup;
  formSectorLight: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;

  weathers: Weather[] = [];
  weathersSubs = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SectorWizardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sector,
    private sectorService: SectorService,
    private weatherService: WeatherService,
    private toast: SnackBarService
    ) {
      this.Form();
      this.months = this.sectorService.Months;
      this.weathersSubs = this.weatherService.itemsChanged.subscribe(
        (newItems) => {
          this.weathers = newItems;
        }
      );
    }

  async ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    this.FormsArray();
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    try {
      await this.weatherService.List();
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    this.weathersSubs.unsubscribe();
  }

  private Form() {
    this.formSector = this.formBuilder.group({
      name: new FormControl( this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      pendingSince: new FormControl( this.data ? this.data.pendingSince : null, [
        Validators.required,
        Validators.maxLength(20),
        this.noWhiteSpace.Validator
      ]),
      pendingUntil: new FormControl( this.data ? this.data.pendingUntil : null, [
        Validators.required,
        Validators.maxLength(20),
        this.noWhiteSpace.Validator
      ]),
      weatherId: new FormControl( this.data ? this.data.weatherId : null, [
        Validators.required,
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  private FormsArray() {
    this.formSectorHumidity =  this.formBuilder.group({
      humidity : this.FormArrayContruct(SectorType.HUMIDITY),
    });
    this.formSectorTemperature =  this.formBuilder.group({
      temperature : this.FormArrayContruct(SectorType.TEMPERATURE),
    });
    this.formSectorLight =  this.formBuilder.group({
      light : this.FormArrayContruct(SectorType.LIGHT),
    });
    console.log(this.formSectorHumidity);
  }

  private FormArrayContruct(opt: SectorType): FormArray {
    const myFormArray = new FormArray([]);
    let myData;
    switch (opt) {
      case '0' :
        myData = this.data ? this.data.sectorHumidities : [];
        break;
      case '1' :
        myData = this.data ? this.data.sectorTemperatures : [];
        break;
      case '2' :
        myData = this.data ? this.data.sectorLights : [];
        break;
    }
    console.log(this.months);
    this.months.forEach(
      (month, index) => {
        myFormArray.push(
          new FormGroup({
            month : new FormControl(month.numValue.toString() , [
              Validators.required,
            ]),
            min : new FormControl(
              this.data ? myData[index].min : null, [
              Validators.required,
              Validators.maxLength(20),
              this.noWhiteSpace.Validator
            ]),
            max : new FormControl(
              this.data ? myData[index].max : null, [
              Validators.required,
              Validators.maxLength(20),
              this.noWhiteSpace.Validator
            ]),
          })
        );
      }
    );
    // for (const item of this.months) {
    //   myFormArray.push(
    //     new FormGroup({
    //       month : new FormControl(+item.numValue , [
    //         Validators.required,
    //         Validators.maxLength(20),
    //         this.noWhiteSpace.Validator
    //       ]),
    //       min : new FormControl(
    //         this.data ? myData[item.numValue - 1].min : null, [
    //         Validators.required,
    //         Validators.maxLength(20),
    //         this.noWhiteSpace.Validator
    //       ]),
    //       max : new FormControl(
    //         this.data ? myData[item.numValue - 1].max : null, [
    //         Validators.required,
    //         Validators.maxLength(20),
    //         this.noWhiteSpace.Validator
    //       ]),
    //     })
    //   );
    // }
    return myFormArray;
  }

  async OnSubmit() {
    try {
      if (this.formSector.valid && this.formSectorHumidity.valid && this.formSectorLight.valid && this.formSectorTemperature.valid) {
        if (this.data) {
          const registrytUpd = new Sector(this.formSector.value);
          registrytUpd._id = this.data._id;
          registrytUpd.sectorHumidities = this.formSectorHumidity.value.humidity;
          registrytUpd.sectorLights = this.formSectorLight.value.light;
          registrytUpd.sectorTemperatures = this.formSectorTemperature.value.temperature;
          await this.sectorService.Update(registrytUpd);
          this.toast.Success('Sector actualizado exitosamente');
          this.Close();
        } else {
          const mySector = new Sector(this.formSector.value);
          mySector.sectorHumidities = this.formSectorHumidity.value.humidity;
          mySector.sectorLights = this.formSectorLight.value.light;
          mySector.sectorTemperatures = this.formSectorTemperature.value.temperature;
          await this.sectorService.Create(mySector);
          this.toast.Success('Sector creado exitosamente');
          this.Close();
        }
      }
    } catch (error) {
      if (error.error.errorBag && error.error.errorBag === 'Name already registered') {
        this.toast.Danger('Ya existe un sector registrado con ese nombre');
        this.Close();
      } else if (error.error.error && error.error.error === 'Name already registered') {
        this.toast.Danger('Ya existe un sector registrado registrada con ese nombre');
        this.Close();
      } else {
        this.toast.Danger('Algo salio mal');
        this.Close();
      }
    }
  }

  MessageError(input: string) {
    if (this.formSector.controls[input] && this.formSector.controls[input].errors && this.formSector.controls[input].touched) {
      const obj = this.formSector.controls[input].errors;
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

  getControls(nameArray: string) {
    let result;
    switch (nameArray) {
      case this.humidityName :
        result = this.formSectorHumidity
        .get(this.humidityName) ? (this.formSectorHumidity.get(this.humidityName) as FormArray).controls : [];
        break;
      case this.temperatureName :
        result = this.formSectorTemperature
        .get(this.temperatureName) ? (this.formSectorTemperature.get(this.temperatureName) as FormArray).controls : [];
        break;
      case this.lightName :
        result = this.formSectorLight
        .get(this.lightName) ? (this.formSectorLight.get(this.lightName) as FormArray).controls : [];
        break;
      default:
        result = [];
        break;
    }
    return result;
  }

}
