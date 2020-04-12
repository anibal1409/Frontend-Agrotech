import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  @Input() text: string = 'No hay elementos registrados.';
  @Input() icon: string = 'not_interested';

  constructor() { }

  ngOnInit() {
  }

}