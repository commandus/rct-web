import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent {
    constructor(
      public env: WebappService,
      private router: Router
    ) {
    }
  
    nav2(p: string): void {
      this.router.navigateByUrl(p);
    }
  
}
