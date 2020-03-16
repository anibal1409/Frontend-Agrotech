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
import { SnackBarService } from 'src/app/core/services/snack-bar.service';


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
  uploading = false;
  reWriteDocument = false;


  response: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Document,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DocumentFormComponent>,
    private documentService: DocumentService,
    private cropService: CropService,
    private snackBarService: SnackBarService
  ) {
    this.Form();
    this.cropsSubs = this.cropService.itemsChanged.subscribe(
      (newItems) => {
        this.crops = newItems;
      }
    );
  }
  editMode() {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }
  toggleUploadBox() {
    this.reWriteDocument = !this.reWriteDocument;
    if (!this.reWriteDocument) {
      this.form.controls.document.setValue(null);
    }
  }

  cropHasDocument(crop: Crop) {
    if (crop.documentId) {
      return true;
    } else {
      return false;
    }
  }
  async ngOnInit() {
    this.crops = await this.cropService.List();
   }

  private Form() {
    const documentValidators = this.data ? [requiredFileType(['pdf'])] : [Validators.required, requiredFileType(['pdf'])];
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
      document: new FormControl(null,
        documentValidators,
      )
    });
  }

  hasError( field: string, error: string ) {
    const control = this.form.get(field);
    return control.dirty && control.hasError(error);
  }

  async OnSubmit() {
    if (this.form.valid) {
      try {
        if (this.data) {
          const registrytUpd = new Document(this.form.value);
          registrytUpd._id = this.data._id;
          await this.documentService.Update(registrytUpd);
          this.snackBarService.Success('Documento editado con exito');
          this.Close();
        } else {
          await this.documentService.Create(this.form.value);
          this.snackBarService.Success('Documento creado con exito');
          this.Close();
        }
      } catch (error) {
        if (error.error.errorBag && error.error.errorBag === 'Name already registered') {
          this.snackBarService.Danger('Ya existe un documento con ese nombre');
        }
        if (error.error.error && error.error.error === 'Name already registered') {
          this.snackBarService.Danger('Ya existe un documento con ese nombre');
        } else {
          this.snackBarService.Danger('Algo salio mal');
        }
      }
    }
  }

  async delete() {
    try {
      await this.documentService.Delete(this.data);
      this.crops = await this.cropService.List();
      this.snackBarService.Success('Documento eliminado');
      this.Close();
    } catch (error) {
      this.snackBarService.Danger('Algo salio mal');
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
