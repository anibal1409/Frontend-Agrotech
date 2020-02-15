import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpace } from 'src/app/common/validators/no-whithe-space.validator';
import { textFieldAppearance } from 'src/app/common/constants/apaperance.constant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextureService } from 'src/app/core/services/texture.service';
import { MessageErrorForms } from 'src/app/common/enum/message-error-forms.enum';
import { Texture } from 'src/app/common/models/texture.model';

@Component({
  selector: 'texture-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TextureFormComponent implements OnInit {

  nameClass = "TextureFormComponent";

  form: FormGroup;
  noWhiteSpace =  new NoWhiteSpace();
  inputAppearance: string = textFieldAppearance;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TextureFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Texture,
    private textureService: TextureService,
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
    if (this.form.valid) {
      if (this.data) {
        try {
          const registrytUpd = new Texture(this.form.value);
          registrytUpd._id = this.data._id;
          if (await this.textureService.Update(registrytUpd)) {
            this.Close();
          }
        } catch (error) {
          console.log(this.nameClass + ' update', error);
        }
      } else {
        try {
          if (await this.textureService.Create(
            new Texture(this.form.value)
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
