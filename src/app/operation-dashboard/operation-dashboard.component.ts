import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-dashboard',
  templateUrl: './operation-dashboard.component.html',
  styleUrls: ['./operation-dashboard.component.css']
})
export class OperationDashboardComponent {
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
