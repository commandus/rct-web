import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {
  constructor(
    public env: WebappService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  nav2(p: string): void {
    this.router.navigateByUrl(p);
  }

  selectDb(n: string): void {
    this.env.rcr.endpoints.select(n);
    localStorage.setItem('db', n);
    this.router.navigateByUrl('');
  }

}
