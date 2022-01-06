import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  // provider: [EventoService]
})

export class EventosComponent implements OnInit {

  modalRef? : BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public larguraImg : number = 100;
  public margemImg : number = 2;
  public showImg : boolean = true;
  private _filtroLista : string = '';


  public get filtroLista() : string {
    return this._filtroLista;
  }

  public set filtroLista(value : string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ?
                            this.filtrarEventos(this.filtroLista) :
                            this.eventos;
  }


  public filtrarEventos(filtrarPor : string) : Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1||
                        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService : EventoService,
    private modalService : BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

  public ngOnInit(): void { //Método que é chamado antes do programa ser iniciado
    this.spinner.show();
    this.getEventos();
  }

  public getEventos() : void {
    this.eventoService.getEventos().subscribe(
      {
        next: (_eventos : Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os Eventos', 'ERRO');
        },
        complete: () => this.spinner.hide()
      }
    );
  }

  public toggleImg() : void {
    this.showImg = !this.showImg
  }

  public abrirModal(template : TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento deletado com sucesso', 'ProEventos');
  }
  decline(): void {
    this.modalRef?.hide();
  }

  /** Retirar método - Botão de Teste */
  public showSuccess() {
    this.toastr.success('Evento deletado com sucesso', 'ProEventos');
  }

}
