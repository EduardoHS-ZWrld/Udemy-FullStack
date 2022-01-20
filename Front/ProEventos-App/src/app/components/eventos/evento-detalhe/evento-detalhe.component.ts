import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form: FormGroup;
  estadoSalvar = 'post';

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY, hh:mm a',
      containerClass: 'theme-default'
    }
  };

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.localeService.use('pt-br')
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento(): void {
    const eventoIdParam = this.actRouter.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();
      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (erro: any) => {
          this.toastr.error('Erro ao carregar os Evento', 'ERROR!');
          console.error(erro);
        }
      ).add(() => this.spinner.hide())
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.min(1), Validators.max(120000)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    this.evento = (this.estadoSalvar === 'post')
      ? { ... this.form.value }
      : { id: this.evento.id, ... this.form.value };
    this.eventoService[this.estadoSalvar](this.evento).subscribe(
      () => {
        this.toastr.success('Evento salvo com sucesso!', 'Sucesso')
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao salvar o Evento', 'Erro');
      },
      () => {
        if (this.estadoSalvar === 'post') {
          this.router.navigate([`eventos/lista`]);
        }
      }
    ).add(() => this.spinner.hide());
  }
}
