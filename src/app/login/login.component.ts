import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../model/user.model';
import { WebappService } from '../webapp.service';
import { LoginRequest } from '../model/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() user: User = new User;
  @Output() logged = new EventEmitter<User>();
  @Output() cancelled = new EventEmitter<void>();
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  message = 'Попробуйте ваш ЛОГИН@ikfia.ysn.ru';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private svc: WebappService
  ) {
    this.success = svc.hasAccount();
    svc.load().subscribe(v=>{});
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      login: [this.user ? this.user.name : '',
        [ Validators.required ]],
      password: [this.user ? this.user.password : '',
        [ Validators.required ]
      ]
    });
   }

  cancel(): void {
    this.cancelled.emit();
  }

  login(): void {
    this.progress = true;
    const r = new LoginRequest;
    r.user.name = this.formGroup.getRawValue().login;
    r.user.password = this.formGroup.getRawValue().password;

    this.svc.rcr.login(r).subscribe(
      value => {
        this.progress = false;
        if (value && value.success) {
          this.success = true;
          this.message = 'Успешный вход';
          this.logged.emit(value.user);
        } else {
          this.success = false;
          this.message = 'Неуспешный вход, повторите';
          // this.cancelled.emit();
        }
      },
      error => {
        this.progress = false;
        this.success = false;
        this.message = 'Неуспешный вход, повторите позже';
        // this.cancelled.emit();
      });
  }

}
