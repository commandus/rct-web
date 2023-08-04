import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent {
  constructor(
    public app: WebappService, 
    private router: Router
  ) { 
  }

  back() {
    this.router.navigateByUrl('');
  }


}

