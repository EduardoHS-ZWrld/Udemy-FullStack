import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  eventoId: number;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  form: FormGroup;
  modalRef?: BsModalRef;
  imagemURL = "assets/images/upload.png";
  file: File;

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY, hh:mm a',
      containerClass: 'theme-default'
    }
  }

  get bsConfigLote(): any {
    return {
      adaptivePosition: true,
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default'
    }
  }

  get f(): any {
    return this.form.controls;
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private loteService: LoteService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.localeService.use('pt-br')
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento(): void {
    this.eventoId = +this.actRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
          if (this.evento.imagemURL !== '') {
            this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;
          }
          this.carregarLotes();
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
      imagemURL: [''],
      lotes: this.fb.array([])
    });
  }

  cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public resetForm(): void {
    //this.form.reset();
  }

  public carregarLotes(): void {
    this.loteService.getLotesByEventoId(this.eventoId).subscribe(
      (lotes: Lote[]) => {
        lotes.forEach(lote => {
          this.lotes.push(this.criarLote(lote));
        })
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome == ''
      ? 'Nome do Lote'
      : nome;
  }

  public salvarEvento(): void {
    this.spinner.show();
    this.evento = (this.estadoSalvar === 'post')
      ? { ... this.form.value }
      : { id: this.evento.id, ... this.form.value };
    this.eventoService[this.estadoSalvar](this.evento).subscribe(
      (eventoRetorno: Evento) => {
        this.toastr.success('Evento salvo com sucesso!', 'Sucesso');
        this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao salvar o Evento', 'Erro');
      }
    ).add(() => this.spinner.hide());
  }


  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    })
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  public salvarLotes(): void {
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();
      this.loteService.saveLotes(this.eventoId, this.form.value.lotes).subscribe(
        () => {
          this.toastr.success('Lotes salvos com sucesso!', 'Sucesso!');
          this.resetLotes();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar lotes', 'Erro')
          console.error(error);
        }
      ).add(() => this.spinner.hide());
    }
  }

  resetLotes(): void {
    for (let index = 1; index <= this.lotes.length;) {
      this.lotes.removeAt(0);
    }

    this.carregarLotes();
  }

  public modalRemoverLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    console.log(this.lotes.get(indice + '.id').value);
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public removerLote(permissao: boolean): void {
    this.modalRef?.hide();

    if (permissao) {
      this.spinner.show();

      if (this.loteAtual.id === 0) {
        this.lotes.removeAt(this.loteAtual.indice);
      } else {
        this.loteService.deleteLote(this.eventoId, this.loteAtual.id)
          .subscribe(
            () => {
              this.toastr.success('Lote removido com sucesso', 'Sucesso');
              this.lotes.removeAt(this.loteAtual.indice);
            },
            (error: any) => {
              console.error(error);
              this.toastr.error('Falha ao tentar remover Lote', 'Erro');
              console.error(error);
            }
          );
      }

      this.spinner.hide();
    }
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com sucesso.', 'Sucesso');
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar atualizar Imagem.', 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());;
  }
}
