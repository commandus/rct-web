import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Reload } from './reload.model';

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
