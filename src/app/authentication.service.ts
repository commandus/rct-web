import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Reload } from './model/reload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements Reload {
  
  user: User = new User;

  constructor(
  ) {
    this.load();
  }

  public load(): void {
    this.user = new User(JSON.parse(localStorage.getItem('user') || '{}'));
  }
}
