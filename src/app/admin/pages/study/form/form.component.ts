import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { Study } from 'src/app/common/models/study.model';
import { AccountService } from 'src/app/core/services/account.service';
import { StudyService } from 'src/app/core/services/study.service';
import { LocationService } from 'src/app/core/services/location.service';
import { SectorService } from 'src/app/core/services/sector.service';
import { TextureService } from 'src/app/core/services/texture.service';

import { Texture } from 'src/app/common/models/texture.model';
import { Sector } from 'src/app/common/models/sector.model';
import { SectorLocation } from 'src/app/common/models/sector-location.model';
import { Month } from 'src/app/common/models/month.model';
import { Subscription } from 'rxjs';
import { Document } from 'src/app/common/models/document.model';
import { RoutesHttp } from 'src/app/common/enum/routes/routes-http.enum';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'study-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class StudyFormComponent implements OnInit {

  nameClass = "StudyFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  textures: Texture[] = [];
  sectors: Sector[] = [];
  locations: SectorLocation[] = [];
  months: Month[] = [];

  sectorsSubs = new Subscription();
  texturesSubs = new Subscription();
  myResults = [];

  readyStudy = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Study,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StudyFormComponent>,
    private studyService: StudyService,
    private locationService: LocationService,
    private sectorService: SectorService,
    private textureService: TextureService,
    private accountService: AccountService,
    private toast: SnackBarService,
  ) {
    this.months = this.sectorService.Months;
    this.sectors = this.sectorService.Items;
    this.textures = this.textureService.Items;
    this.Form();
    this.sectorsSubs = this.sectorService.itemsChanged.subscribe(
      (newItems) => {
        this.sectors = newItems;
      }
    );
    this.texturesSubs = this.textureService.itemsChanged.subscribe(
      (newItems) => {
        this.textures = newItems;
      }
    );
  }

  ngOnInit() {
    if (this.data) {
      this.readyStudy = true;
      this.myResults = this.studyService.Result(this.data);
      this.GetLocations(this.data.sectorId);
      this.disableControls();
    }
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      texturesId: new FormControl( this.data ? this.data.texturesId : null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      sectorId: new FormControl( this.data ? this.data.sectorId : null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      locationId: new FormControl( this.data ? this.data.locationId : null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      month: new FormControl( this.data ? this.data.month + '' : null, [
        Validators.required,
        this.noWhiteSpace.Validator
      ]),
      ph: new FormControl( this.data ? this.data.ph : null, [
        Validators.required,
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      mo: new FormControl( this.data ? this.data.mo : null, [
        Validators.required,
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      ce: new FormControl( this.data ? this.data.ce : null, [
        Validators.required,
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    try {
      if (this.form.valid) {
        if (this.data) {
          const registrytUpd = new Study(this.form.value);
          registrytUpd._id = this.data._id;
          await this.studyService.Update(registrytUpd);
          this.toast.Success('Estudio actualizado exitosamente');
          this.Close();
        } else {
          if (!this.readyStudy) {
            const myRegistry = new Study(this.form.value);
            myRegistry.month = (+this.form.value.month);
            myRegistry.userId = this.accountService.User()._id;
            await this.studyService.Create(myRegistry);
            this.readyStudy = true;
            this.myResults = this.studyService.Result(myRegistry);
            this.toast.Success('Estudio creado exitosamente');
            this.Close();
          }
        }
      }
    } catch (error) {
      if (error.error.errorBag && error.error.errorBag === 'Name already registered') {
        this.toast.Danger('Ya existe un estudio registrado con ese nombre');
        this.Close();
      } else if (error.error.error && error.error.error === 'Name already registered') {
        this.toast.Danger('Ya existe un estudio registrado con ese nombre');
        this.Close();
      } else {
        this.toast.Danger('Algo salio mal');
        this.Close();
      }
    }

  }
  disableControls() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].disable();
    });
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

  GetLocations(idSector) {
    console.log('idSector', idSector);
    this.locations = this.locationService.GetItemsIDSector(idSector);
    console.log(this.locations);
  }

  downloadMyFile(myDocument: Document){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', RoutesHttp.IP + myDocument.path);
    link.setAttribute('download', myDocument.name + '.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
