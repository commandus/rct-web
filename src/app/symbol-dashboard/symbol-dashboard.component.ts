import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symbol-dashboard',
  templateUrl: './symbol-dashboard.component.html',
  styleUrls: ['./symbol-dashboard.component.css']
})
export class SymbolDashboardComponent {
  constructor(
    public svc: WebappService, 
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
