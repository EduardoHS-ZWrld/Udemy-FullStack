import { NgModule, Component, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContatosComponent } from '@app/components/contatos/contatos.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { EventoDetalheComponent } from '@app/components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from '@app/components/eventos/evento-lista/evento-lista.component';
import { EventosComponent } from '@app/components/eventos/eventos.component';
import { PalestrantesComponent } from '@app/components/palestrantes/palestrantes.component';
import { PerfilComponent } from '@app/components/user/perfil/perfil.component';
import { LoginComponent } from '@app/components/user/login/login.component';
import { RegistrationComponent } from '@app/components/user/registration/registration.component';
import { UserComponent } from '@app/components/user/user.component';
import { HomeComponent } from '@app/components/home/home.component';

import { NavComponent } from '@app/shared/nav/nav.component';
import { TituloComponent } from '@app/shared/titulo/titulo.component';

import { AccountService } from '@app/services/account.service';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';

import { JwtInterceptor } from '@app/interceptors/jwt.interceptor';

import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    PerfilComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipe,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  exports: [
  ],
  providers: [
    AccountService,
    EventoService,
    LoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
