import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { SectorLocation } from 'src/app/common/models/sector-location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { Texture } from 'src/app/common/models/texture.model';
import { Sector } from 'src/app/common/models/sector.model';
import { TextureService } from 'src/app/core/services/texture.service';
import { SectorService } from 'src/app/core/services/sector.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'location-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class LocationFormComponent implements OnInit {

  nameClass = "LocationFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  textures: Texture[] = [];
  sectors: Sector[] = [];
  sectorsSubs = new Subscription();
  texturesSubs = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectorLocation,
    private locationService: LocationService,
    private sectorService: SectorService,
    private textureService: TextureService,
  ) {
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

  async ngOnInit() {
    try {
      await this.sectorService.List();
      await this.textureService.List();
      
    } catch (err) {
      console.log(err);
    }
    
  }

  ngOnDestroy() {
    this.sectorsSubs.unsubscribe();
    this.texturesSubs.unsubscribe();
  }

  private Form() {
    this.form = this.formBuilder.group({
      name: new FormControl( this.data ? this.data.name : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      ASNM: new FormControl( this.data ? this.data.ASNM : null, [
        Validators.required,
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      texturesIds: new FormControl( this.data ? this.data.texturesIds : null, [
        Validators.required,
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
      sectorId: new FormControl( this.data ? this.data.sectorId : null, [
        Validators.required,
        Validators.maxLength(50),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
      if (this.data) {
        try {
          const registrytUpd = new SectorLocation(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.locationService.Update(registrytUpd)) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
          if (await this.locationService.Create(
            new SectorLocation(this.form.value)
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
