import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-dashboard',
  templateUrl: './box-dashboard.component.html',
  styleUrls: ['./box-dashboard.component.css']
})
export class BoxDashboardComponent {
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
