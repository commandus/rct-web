import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-symbol-property-dashboard',
  templateUrl: './symbol-property-dashboard.component.html',
  styleUrls: ['./symbol-property-dashboard.component.css']
})
export class SymbolPropertyDashboardComponent {
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
