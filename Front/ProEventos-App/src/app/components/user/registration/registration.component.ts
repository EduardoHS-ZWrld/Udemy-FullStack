import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@app/models/Identity/User';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { AccountService } from '@app/services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user = {} as User;
  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'passwordConfirm')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    }, formOptions);
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.logarUser(this.user, 'RegisterUser').subscribe(
      () => this.router.navigateByUrl('/login'),
      (error: any) => this.toastr.error(error.value)
    )
  }
}
