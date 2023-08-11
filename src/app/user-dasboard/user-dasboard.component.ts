import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.css']
})
export class UserDasboardComponent {
  constructor(
    public svc: WebappService, 
    private router: Router
  ) {
    svc.load().subscribe(v=>{}); 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
