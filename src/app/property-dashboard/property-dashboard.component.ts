import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent {
  constructor(
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }
}
