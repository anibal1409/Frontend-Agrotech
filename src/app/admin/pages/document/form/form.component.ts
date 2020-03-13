import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { Document } from 'src/app/common/models/document.model';
import { DocumentService } from 'src/app/core/services/document.service';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/common/models/crop.model';
import { CropService } from 'src/app/core/services/crop.service';
import { requiredFileType } from 'src/app/common/components/upload-file/upload-file-validator';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  nameClass = "DocumentFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;
  crops: Crop[] = [];
  cropsSubs = new Subscription();
  private fileData = null;
  uploading = false;


  response: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Document,
    private documentService: DocumentService,
    private cropService: CropService,
  ) {
    this.Form();
    this.crops = this.cropService.Items;
    this.cropsSubs = this.cropService.itemsChanged.subscribe(
      (newItems) => {
        this.crops = newItems;
        console.log(this.crops);
      }
    );

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
      cropId: new FormControl( this.data ? this.data.cropId : null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        this.noWhiteSpace.Validator
      ]),
      document: new FormControl(null, [
        Validators.required,
        requiredFileType(['png', 'jpg', 'pdf'])
      ])
    });
  }

  hasError( field: string, error: string ) {
    const control = this.form.get(field);
    return control.dirty && control.hasError(error);
  }

  async OnSubmit() {
    if (this.form.valid && this.fileData) {
      if (this.data) {
        try {
          const registrytUpd = new Document(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.documentService.Update(registrytUpd, this.fileData)) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
            if (await this.documentService.Create(
              new Document(this.form.value),
              this.fileData
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
test(){
  console.log(this.form);
}
  Close() {
    this.dialogRef.close();
  }

  LoadFile(event) {
    this.fileData = event.target.files[0];
  }

}
