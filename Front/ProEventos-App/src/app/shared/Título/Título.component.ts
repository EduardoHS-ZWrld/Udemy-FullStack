import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Titulo',
  templateUrl: './Título.component.html',
  styleUrls: ['./Título.component.scss']
})
export class TítuloComponent implements OnInit {

  @Input() titulo = '';

  constructor() { }

  ngOnInit() : void {
  }

}
