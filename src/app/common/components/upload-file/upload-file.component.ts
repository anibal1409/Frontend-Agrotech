import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadFileComponent,
      multi: true
    }
  ]
})
export class UploadFileComponent implements OnInit, ControlValueAccessor {
  private file: File | null = null;
  @Input() uploading: boolean;
  onChange: any = () => { };

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;

    console.log(this.file);
  }
  constructor( private host: ElementRef<HTMLInputElement> ) {
  }
  ngOnInit(): void {
  }
  writeValue( value: null ) {
    this.host.nativeElement.value = '';
    this.file = null;
  }
  registerOnChange( fn: () => { } ) {
    this.onChange = fn;
  }
  registerOnTouched( fn: () => { } ) {
  }

}
