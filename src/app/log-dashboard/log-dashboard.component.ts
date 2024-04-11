import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Box } from '../model/box.model';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent {
  public box = 0n;
  public card_id = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { 
  }

  ngOnInit(): void {
    const b = this.route.snapshot.paramMap.get('box');;
    this.box = b ? Box.string2boxBigint(b) : 0n;
    this.card_id = Number(this.route.snapshot.paramMap.get('card_id'));
  }

  back() {
    this.router.navigateByUrl('');
  }
}
