import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-dashboard',
  templateUrl: './box-dashboard.component.html',
  styleUrls: ['./box-dashboard.component.css']
})
export class BoxDashboardComponent {
constructor(
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
