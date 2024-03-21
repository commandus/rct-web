import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent {
  constructor(
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
