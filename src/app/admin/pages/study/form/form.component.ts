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
import { CropService } from 'src/app/core/services/crop.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { Texture } from 'src/app/common/models/texture.model';
import { Sector } from 'src/app/common/models/sector.model';
import { SectorLocation } from 'src/app/common/models/sector-location.model';
import { Month } from 'src/app/common/models/month.model';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Document } from 'src/app/common/models/document.model';
import { Crop } from 'src/app/common/models/crop.model';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  crop: Crop;
  documents?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.documents && node.documents.length > 0,
      name: node.crop.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.documents);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StudyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Study,
    private studyService: StudyService,
    private locationService: LocationService,
    private sectorService: SectorService,
    private textureService: TextureService,
    private accountService: AccountService,
    private cropService: CropService,
    private documentService: DocumentService,
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
    this.dataSource.data = this.myResults;
  }

  ngOnInit() {
    if (this.data) {
      this.readyStudy = true;
      this.myResults = this.studyService.Result(this.data);
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
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      sectorId: new FormControl( this.data ? this.data.sectorId : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      LocationId: new FormControl( this.data ? this.data.LocationId : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      month: new FormControl( this.data ? this.data.month : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      ph: new FormControl( this.data ? this.data.ph : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      mo: new FormControl( this.data ? this.data.mo : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      ce: new FormControl( this.data ? this.data.ce : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
    });

  }

  async OnSubmit() {
    if (this.form.valid) {
      if (this.data) {
        try {
          const registrytUpd = new Study(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.studyService.Update(registrytUpd)) {
            // this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
          if (!this.readyStudy) {
            let myRegistry = new Study(this.form.value);
            myRegistry.userId = this.accountService.User()._id;
            if (await this.studyService.Create(myRegistry)) {
              this.readyStudy = true;
              this.myResults = this.studyService.Result(myRegistry);
              // this.Close();
            }
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

  GetLocations(idSector) {
    console.log('idSector', idSector);
    this.locations = this.locationService.GetItemsIDSector(idSector);
    console.log(this.locations);
  }

}
