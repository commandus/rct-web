import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent {
  public box_id = 0;
  public card_id = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { 
  }

  ngOnInit(): void {
    this.box_id = Number(this.route.snapshot.paramMap.get('box_id'));
    this.card_id = Number(this.route.snapshot.paramMap.get('card_id'));
  }

  back() {
    this.router.navigateByUrl('');
  }
}
