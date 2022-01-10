import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Titulo',
  templateUrl: './Título.component.html',
  styleUrls: ['./Título.component.scss']
})
export class TítuloComponent implements OnInit {

  @Input() iconClass = 'fa fa-user';
  @Input() titulo = '';
  @Input() subtitulo = 'subtítulo opc';
  @Input() botaoList = false;

  constructor(private router : Router) { }

  ngOnInit() : void {
  }

  listar() : void {
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`])
  }

}
