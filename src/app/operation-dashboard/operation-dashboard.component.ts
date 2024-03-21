import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-dashboard',
  templateUrl: './operation-dashboard.component.html',
  styleUrls: ['./operation-dashboard.component.css']
})
export class OperationDashboardComponent {
  constructor(
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
