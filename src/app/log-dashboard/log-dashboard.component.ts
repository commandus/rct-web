import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent {
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
