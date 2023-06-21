import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent {
  constructor(
    private router: Router
  ) {
  }

  nav2(p: string): void {
    this.router.navigateByUrl(p);
  }

}
